
import {SuiClientProvider, WalletProvider} from '@mysten/dapp-kit';
import {getFullnodeUrl} from '@mysten/sui.js/client';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
// Components
import Navigation from './components/Navigation';
import CreateNft from "./components/CreateNft"
import '@mysten/dapp-kit/dist/index.css';

// ABIs
import NFT from './constants/NFT.json'

// Config
import config from './config.json';

function App() {
    const queryClient = new QueryClient();
    const networks = {
        devnet: {url: getFullnodeUrl('devnet')},
        mainnet: {url: getFullnodeUrl('mainnet')},
    };

    return (
        <QueryClientProvider client={queryClient}>
            <SuiClientProvider networks={networks} defaultNetwork="devnet">
                <WalletProvider>
                        <Navigation/>
                        <CreateNft/>
                </WalletProvider>
            </SuiClientProvider>
        </QueryClientProvider>
    );
}

export default App;
