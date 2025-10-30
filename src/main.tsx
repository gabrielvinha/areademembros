import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

const rootElement = document.getElementById('root');

if (!rootElement) {
  console.error('Root element not found');
  document.body.innerHTML = '<div style="color: white; padding: 20px; background: #0B0B0F; min-height: 100vh; display: flex; align-items: center; justify-content: center;"><h1>Erro: Elemento root não encontrado</h1></div>';
} else {
  try {
    createRoot(rootElement).render(
      <StrictMode>
        <App />
      </StrictMode>
    );
  } catch (error) {
    console.error('Error rendering app:', error);
    document.body.innerHTML = '<div style="color: white; padding: 20px; background: #0B0B0F; min-height: 100vh; display: flex; align-items: center; justify-content: center; flex-direction: column;"><h1>Erro ao carregar aplicação</h1><p>Por favor, recarregue a página.</p></div>';
  }
}
