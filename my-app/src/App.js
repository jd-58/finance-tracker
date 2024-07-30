import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <main>
      <h1>$400<span>.00</span></h1>
        <form>
            <div className='basicInfo'>
                <input type='text' placeholder={'+200 new TV'}/>
                <input type='datetime-local'/>
            </div>
            <div className='description'>
                <input type='text' placeholder={'description'}/>
            </div>
            <button type='submit'>Add new transaction</button>
        </form>
        <div className="transactionsHolder">
            <div className="transactions">
                <div className="left">
                    <div className="name">New TV</div>
                    <div className="description">Time for an upgrade</div>
                </div>
                <div className="right">
                    <div className="price-red">-$500</div>
                    <div className="datetime">2022-12-18 15:45</div>
                </div>
            </div>
            <div className="transactions">
                <div className="left">
                    <div className="name">New Website Gig</div>
                    <div className="description">Time for an upgrade</div>
                </div>
                <div className="right">
                    <div className="price-green">+$400</div>
                    <div className="datetime">2022-12-18 15:45</div>
                </div>
            </div>
            <div className="transactions">
                <div className="left">
                    <div className="name">iPhone</div>
                    <div className="description">Time for an upgrade</div>
                </div>
                <div className="right">
                    <div className="price-red">-$900</div>
                    <div className="datetime">2022-12-18 15:45</div>
                </div>
            </div>
        </div>
    </main>
  );
}

export default App;
