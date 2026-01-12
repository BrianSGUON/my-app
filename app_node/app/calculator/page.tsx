import Calculator from '@/components/Calculator';

export default function CalculatorPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-white text-4xl font-bold mb-8">
          Calculatrice React
        </h1>
        <Calculator />
        
        {/* Explication des Hooks utilisés */}
        <div className="mt-8 bg-gray-800 bg-opacity-50 rounded-xl p-6 max-w-md text-left">
          <h2 className="text-white text-xl font-semibold mb-3">
            🎣 Hooks utilisés :
          </h2>
          <ul className="text-gray-300 space-y-2 text-sm">
            <li>
              <span className="text-blue-400 font-mono">useState</span> : 
              Gère l'affichage, la valeur précédente et l'opération
            </li>
            <li>
              <span className="text-green-400 font-mono">useCallback</span> : 
              Optimise les fonctions pour éviter les re-rendus inutiles
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
}