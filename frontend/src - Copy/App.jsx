import { useState, useEffect } from 'react'

function App() {
  const [currentInfo, setCurrentInfo] = useState('');
  const [history, setHistory] = useState('');
  const [status, setStatus] = useState('Checking cloud API...');
  const [isError, setIsError] = useState(false);

  // Check health on load
  useEffect(() => {
    fetch('/api/health')
      .then(res => res.json())
      .then(() => {
        setStatus('Cloud API Connected');
        setIsError(false);
      })
      .catch(() => {
        setStatus('Cloud API Disconnected');
        setIsError(true);
      });
  }, []);

  const handleNumber = (num) => {
    setCurrentInfo(prev => prev + num);
  };

  const handleOperator = (op) => {
    if (currentInfo === '' && op !== '-') return;
    setCurrentInfo(prev => prev + op);
  };

  const handleClear = () => {
    setCurrentInfo('');
    setHistory('');
  };

  const handleCalculate = async () => {
    if (!currentInfo) return;

    setHistory(currentInfo + ' = ');
    try {
      // Sending calculation logic to your Node.js Backend!
      const response = await fetch('/api/calculate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ expression: currentInfo })
      });
      const data = await response.json();
      if (data.error) {
        setCurrentInfo('Error');
      } else {
        setCurrentInfo(String(data.result));
      }
    } catch (error) {
      setCurrentInfo('Error');
    }
  };

  return (
    <div className="calculator-wrapper">
      <div className="display-area">
        <div className="history">{history}</div>
        <div className="current">{currentInfo || '0'}</div>
      </div>

      <div className="keyboard">
        <button className="clear" onClick={handleClear}>C</button>
        <button className="operator" onClick={() => handleOperator('(')}>(</button>
        <button className="operator" onClick={() => handleOperator(')')}>)</button>
        <button className="operator" onClick={() => handleOperator('/')}>/</button>

        <button onClick={() => handleNumber('7')}>7</button>
        <button onClick={() => handleNumber('8')}>8</button>
        <button onClick={() => handleNumber('9')}>9</button>
        <button className="operator" onClick={() => handleOperator('*')}>*</button>

        <button onClick={() => handleNumber('4')}>4</button>
        <button onClick={() => handleNumber('5')}>5</button>
        <button onClick={() => handleNumber('6')}>6</button>
        <button className="operator" onClick={() => handleOperator('-')}>-</button>

        <button onClick={() => handleNumber('1')}>1</button>
        <button onClick={() => handleNumber('2')}>2</button>
        <button onClick={() => handleNumber('3')}>3</button>
        <button className="operator" onClick={() => handleOperator('+')}>+</button>

        <button onClick={() => handleNumber('0')} style={{ gridColumn: 'span 2' }}>0</button>
        <button onClick={() => handleNumber('.')}>.</button>
        <button className="equals" onClick={handleCalculate}>=</button>
      </div>

      <div className={`cloud-status ${isError ? 'error' : 'connected'}`}>
        {isError ? '🔴' : '🟢'} {status}
      </div>
    </div>
  )
}

export default App
