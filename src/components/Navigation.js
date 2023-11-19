// import { ethers } from 'ethers';
import {ConnectButton} from '@mysten/dapp-kit';


const Navigation = () => {


    return (
        <nav>
            <div className="nav__brand ">
                <h1>AI NFT Generator</h1>
                <div>
                <header className=" App-header App ">
                        <ConnectButton/>
                </header>
                </div>
            </div>
        </nav>
    );
}

export default Navigation;