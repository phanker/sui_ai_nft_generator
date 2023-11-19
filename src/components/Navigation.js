// import { ethers } from 'ethers';
import { ConnectButton } from '@mysten/dapp-kit';


const Navigation = () => {


    return (
        <nav>
            <div className="nav__brand App">
                <h1>AI NFT Generator</h1>
                <header className="App-header">
                    <ConnectButton />
                </header>
            </div>
        </nav>
    );
}

export default Navigation;