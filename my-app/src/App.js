
import './App.css';
import {useState} from 'react';

// npm start to run the app in the /my-app directory
// node index.js to run the server in the /my-app/api directory

// TO-DO: make date show correctly in the transaction list
// TO-DO: add a button that changes between adding or subtracting money
// TO-DO: add a "clear transactions" button (make it ask the user if they are sure)
// TO-DO: make overall styling nice and more consistent with my webpage coloring (dark blue)
function App() {
    const [name, setName] = useState('');
    const [datetime, setDatetime] = useState('');
    const [description, setDescription] = useState('');
    const [transactions, setTransactions] = useState([]);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [price, setPrice] = useState('');
    const [isFetching, setIsFetching] = useState(false); // State to track if fetch is in progress

    async function getTransactions() {
        const url = `${process.env.REACT_APP_API_URL}/transactions?username=${username}&password=${password}`;
        const response = await fetch(url)
        return await response.json();
    }
    function addTransaction(ev) {
        ev.preventDefault();
        const url = process.env.REACT_APP_API_URL+'/transaction';

        console.log(url);
        fetch(url, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name,
                price,
                datetime,
                description,
                username,
                password})
        }).then(response => {
            response.json().then(json => {
                setName('')
                setDescription('')
                setDatetime('')
                setPrice('')
                // setUsername('')
                // setPassword('')
                console.log('result', json)
                getTransactions().then(setTransactions);
            });
        });
    }

    function fetchUserTransactions() {
        if (isFetching) return; // Prevent multiple fetches
        setIsFetching(true); // Set fetching state to true
        getTransactions().then(transactions => {
            setTransactions(transactions);
            setIsFetching(false); // Reset fetching state
        });
    }

    let balance = 0;
    transactions.forEach(transaction => {
        balance += transaction.price;
    });

    balance = balance.toFixed(2);
    const fraction = balance.split('.')[1];
    balance = balance.split('.')[0]
  return (
    <main>
      <h1>${balance}<span>{fraction}</span></h1>
        <form onSubmit={addTransaction}>
            <div className='username-password-label'>
                <label className='info-label' id='username-label' htmlFor='username'>Username</label>
                <label className='info-label' id='password-label' htmlFor='password'>Password</label>
            </div>
            <div className='username-password'>
                <input id='username'
                       type='text'
                       value={username}
                       onChange={ev => setUsername(ev.target.value)}/>
                <input id='password'
                       type='text'
                       value={password}
                       onChange={ev => setPassword(ev.target.value)}/>
            </div>
            <button type='button' onClick={fetchUserTransactions}>Fetch User Transactions</button>
            {/* Add button to fetch transactions */}
            <div className='basicInfo-label'>
                <label className='info-label' id='value-label' htmlFor='value'>Value</label>
                <label className='info-label' id='title-label' htmlFor='value'>Transaction Title</label>
            </div>
            <div className='basicInfo' id='price-and-title'>
                <input id='price'
                       type='text'
                       value={price}
                       onChange={ev => setPrice(ev.target.value)}/>
                <input id='transaction-title'
                       type='text'
                       value={name}
                       onChange={ev => setName(ev.target.value)}/>
            </div>
            <label className='info-label' id='date-label' htmlFor='date'>Date</label>
            <div className='basicInfo' id='date-input'>
                <input id='date'
                       type='date'
                       value={datetime}
                       onChange={ev => setDatetime(ev.target.value)}/>
            </div>
            <div class='description-label'>
                <label className='info-label' id='description-label' htmlFor='description'>Transaction Description</label>
            </div>
            <div class='description'>
                <input id='description'
                       type='text'
                       value={description}
                       onChange={ev => setDescription(ev.target.value)}/>
            </div>
            <button type='submit'>Add new transaction</button>

        </form>
        <div className="transactionsHolder">
            {transactions.length > 0 && transactions.map(transactions => (
                <div>
                    <div className="transactions">
                        <div className="left">
                            <div className="name">{transactions.name}</div>
                            <div className="description">{transactions.description}</div>
                        </div>
                        <div className="right">
                            <div className={"price-" + (transactions.price<0?'red':'green')}>
                                {transactions.price}
                            </div>
                            <div className="datetime">{transactions.datetime}</div>
                        </div>
                    </div>
                </div>
            ))}


        </div>
    </main>
  );
}

export default App;
