# Starknet Paymaster Voting DApp

A gasless voting decentralized application built on Starknet that allows users to vote without paying transaction fees, powered by paymaster functionality.

## ✨ Features

- **Gasless Voting**: Vote without paying gas fees thanks to paymaster integration
- **Real-time Vote Tracking**: See current vote counts updated in real-time
- **Wallet Integration**: Connect your Starknet wallet seamlessly
- **Modern UI**: Clean, responsive interface with purple and black theme
- **Secure**: Built on Starknet for maximum security and decentralization

## 🚀 Getting Started

### Prerequisites

- Node.js (v22 or higher)
- A Starknet wallet (ArgentX, Braavos, etc.)
- Git

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd paymaster-voting-dapp
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🔧 Usage

1. **Connect Wallet**: Click "Connect Wallet" in the top navigation
2. **Set Amount**: Enter the number of votes you want to cast
3. **Vote**: Click "Increase Votes" or "Decrease Votes"
4. **No Gas Fees**: Enjoy gasless transactions thanks to the paymaster!

## 🛠️ Tech Stack

- **Frontend**: Next.js, React, TypeScript
- **Styling**: Tailwind CSS
- **Blockchain**: Starknet
- **Wallet**: Starknet React
- **UI Components**: Shadcn/ui

## 📂 Project Structure

```
├── components/
│   ├── Navbar.tsx           # Navigation component
│   ├── VotingInterface.tsx  # Main voting interface
│   ├── IncreaseVotesButton.tsx
│   ├── DecreaseVotesButton.tsx
│   ├── WalletModal.tsx
│   └── AccountModal.tsx
├── app/
│   ├── hooks/
│   │   └── use-blockchain.ts # Blockchain interaction hooks
│   └── page.tsx             # Main page
├── abi/
│   └── voting_abi.ts        # Smart contract ABI
└── globals.css              # Global styles
```

## 🔗 Smart Contract

The DApp interacts with a Starknet smart contract that handles:
- Vote counting
- Vote increasing/decreasing
- Paymaster functionality for gasless transactions

## 🎨 Features

### Paymaster Integration
- Users can vote without holding ETH for gas fees
- Seamless user experience with no transaction costs
- Sponsored transactions through paymaster service

### Voting System
- Increase or decrease vote counts
- Real-time vote display
- Input validation and error handling

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙋‍♂️ Support

If you have any questions or need help:
- Open an issue on GitHub
- Check the [Starknet documentation](https://docs.starknet.io/)
- Join the [Starknet Discord](https://discord.gg/starknet)

## 🌟 Acknowledgments

- [Starknet](https://starknet.io/) for the amazing blockchain platform
- [ArgentX](https://www.argent.xyz/) for wallet integration
- The Starknet community for support and resources

---

Built with ❤️ on Starknet
