import { createClient } from 'npm:@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

interface GGCheckoutWebhookData {
  event: string;
  'customer/name': string;
  'customer/email': string;
  'customer/document': string;
  'customer/phone': string;
  'products/0/id': string;
  'products/0/name': string;
  'products/0/price': number;
  'payment/method': string;
  'payment/status': string;
  'payment/amount': number;
}

// Mapeamento de produtos para módulos
const PRODUCT_MODULE_MAPPING: Record<string, string[]> = {
  'produto-modulo-2': ['module2'],
  'produto-modulo-3': ['module3'],
  'produto-prosperidade': ['prosperity'],
  // Adicione mais mapeamentos conforme necessário
};

Deno.serve(async (req: Request) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  // Handle GET requests (when accessed directly in browser)
  if (req.method === 'GET') {
    const html = `
      <!DOCTYPE html>
      <html lang="pt-BR">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>GGCheckout Webhook - Frequência da Alma</title>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: linear-gradient(135deg, #0B0B0F 0%, #1a1a2e 100%);
            color: white;
            margin: 0;
            padding: 20px;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .container {
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 20px;
            padding: 40px;
            text-align: center;
            max-width: 600px;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
          }
          .logo {
            width: 80px;
            height: 80px;
            background: #FFD166;
            border-radius: 16px;
            margin: 0 auto 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 32px;
            font-weight: bold;
            color: black;
          }
          h1 {
            color: #FFD166;
            margin-bottom: 10px;
            font-size: 2.5em;
          }
          .status {
            background: rgba(34, 197, 94, 0.2);
            border: 1px solid #22c55e;
            border-radius: 12px;
            padding: 20px;
            margin: 20px 0;
          }
          .status-icon {
            font-size: 48px;
            margin-bottom: 10px;
          }
          .info {
            background: rgba(255, 255, 255, 0.05);
            border-radius: 12px;
            padding: 20px;
            margin: 20px 0;
            text-align: left;
          }
          .info h3 {
            color: #FFD166;
            margin-top: 0;
          }
          code {
            background: rgba(0, 0, 0, 0.3);
            padding: 2px 6px;
            border-radius: 4px;
            font-family: 'Courier New', monospace;
          }
          .timestamp {
            color: #888;
            font-size: 0.9em;
            margin-top: 20px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="logo">F</div>
          <h1>Webhook GGCheckout</h1>
          <p>Frequência da Alma - Área de Membros</p>
          
          <div class="status">
            <div class="status-icon">✅</div>
            <h2>Webhook Funcionando!</h2>
            <p>A integração com GGCheckout está configurada e operacional.</p>
          </div>
          
          <div class="info">
            <h3>📋 Informações Técnicas</h3>
            <p><strong>URL do Webhook:</strong><br>
            <code>${req.url}</code></p>
            
            <p><strong>Métodos Aceitos:</strong><br>
            <code>POST</code> - Para receber dados do GGCheckout<br>
            <code>GET</code> - Para verificação (esta página)</p>
            
            <p><strong>Status:</strong> <span style="color: #22c55e;">🟢 Online</span></p>
          </div>
          
          <div class="info">
            <h3>🔧 Como Usar</h3>
            <p>1. Configure esta URL no painel do GGCheckout</p>
            <p>2. Quando uma compra for aprovada, o webhook será chamado automaticamente</p>
            <p>3. O sistema criará/atualizará o usuário e desbloqueará os módulos</p>
          </div>
          
          <div class="timestamp">
            Verificado em: ${new Date().toLocaleString('pt-BR')}
          </div>
        </div>
      </body>
      </html>
    `;
    
    return new Response(html, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        ...corsHeaders
      },
    });
  }

  try {
    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Parse webhook data
    const webhookData: GGCheckoutWebhookData = await req.json();
    
    console.log('Received webhook:', webhookData);

    // Extract data from webhook
    const customerEmail = webhookData['customer/email'];
    const customerName = webhookData['customer/name'];
    const customerDocument = webhookData['customer/document'];
    const customerPhone = webhookData['customer/phone'];
    const productId = webhookData['products/0/id'];
    const productName = webhookData['products/0/name'];
    const productPrice = webhookData['products/0/price'];
    const paymentMethod = webhookData['payment/method'];
    const paymentStatus = webhookData['payment/status'];
    const paymentAmount = webhookData['payment/amount'];
    const eventType = webhookData.event;

    // Only process successful payments
    if (paymentStatus === 'approved' || paymentStatus === 'paid') {
      // Check if user exists, if not create one
      let userId: string;
      
      // Try to find existing user by email
      const { data: existingUser } = await supabase.auth.admin.listUsers();
      const userExists = existingUser?.users.find(user => user.email === customerEmail);
      
      if (userExists) {
        userId = userExists.id;
      } else {
        // Create new user
        const { data: newUser, error: createUserError } = await supabase.auth.admin.createUser({
          email: customerEmail,
          password: 'novaalma123', // Default password
          email_confirm: true,
          user_metadata: {
            name: customerName,
            document: customerDocument,
            phone: customerPhone,
          }
        });

        if (createUserError) {
          console.error('Error creating user:', createUserError);
          throw createUserError;
        }

        userId = newUser.user.id;

        // Create user profile
        const { error: profileError } = await supabase
          .from('user_profiles')
          .insert({
            id: userId,
            name: customerName,
            document: customerDocument,
            phone: customerPhone,
          });

        if (profileError) {
          console.error('Error creating user profile:', profileError);
        }
      }

      // Record the purchase
      const { error: purchaseError } = await supabase
        .from('purchases')
        .insert({
          user_id: userId,
          customer_name: customerName,
          customer_email: customerEmail,
          customer_document: customerDocument,
          customer_phone: customerPhone,
          product_id: productId,
          product_name: productName,
          product_price: productPrice,
          payment_method: paymentMethod,
          payment_status: paymentStatus,
          payment_amount: paymentAmount,
          event_type: eventType,
          webhook_data: webhookData,
        });

      if (purchaseError) {
        console.error('Error recording purchase:', purchaseError);
        throw purchaseError;
      }

      // Unlock modules based on product
      const modulesToUnlock = PRODUCT_MODULE_MAPPING[productId] || [];
      
      for (const moduleId of modulesToUnlock) {
        const { error: moduleError } = await supabase
          .from('user_modules')
          .upsert({
            user_id: userId,
            module_id: moduleId,
          }, {
            onConflict: 'user_id,module_id'
          });

        if (moduleError) {
          console.error(`Error unlocking module ${moduleId}:`, moduleError);
        }
      }

      console.log(`Successfully processed purchase for user ${userId}, unlocked modules: ${modulesToUnlock.join(', ')}`);
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Webhook processed successfully' 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );

  } catch (error) {
    console.error('Webhook processing error:', error);
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});