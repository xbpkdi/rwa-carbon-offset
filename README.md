# rwa-carbon-offset

AI usage → gCO₂e range → real Carbonmark retirement → public certificate + Avalanche **C-Chain** receipt.

Not an Avalanche L1. The smart contract lives on Fuji C-Chain (43113).

## Day-1 spike (do this first)

```bash
cp .env.example .env
# put CARBONMARK_API_KEY in .env — never commit it
npm install
npx tsx --env-file=.env spike/retire.ts
```

Success = a URL like `https://app.carbonmark.com/retirements/{address}/{n}`.

Klima x402 (Base Sepolia, optional if you have test USDC):

```bash
npx tsx --env-file=.env spike/klima-retire.ts
```

## C-Chain receipt

```bash
npx tsx spike/compile-contract.ts
# fund a Fuji wallet, set FUJI_PRIVATE_KEY
npx tsx --env-file=.env spike/deploy-receipt.ts
# copy CERTIFICATE_RECEIPT_ADDRESS into .env and apps/web/.env.local
```

Snowtrace: https://testnet.snowtrace.io

# Demo

```bash
cp .env apps/web/.env.local
npm run dev
```

Open http://localhost:3000

Four screens: `/` `/estimate` `/checkout` `/certificate/[id]`

Checkout is a Phase-1 shortcut (no Stripe): it calls Carbonmark then `record()` on Fuji when the recorder key is set.

Fuji deploy needs test AVAX at recorder `0x629506bc91402Ed6675ab5456c7B24BD2bDdD588`:
https://core.app/tools/testnet-faucet/?subnet=c&token=c
Then `npm run deploy:fuji`

## Demo talking points (2 min)

1. One AI query is ~0.03–3 g; the chain minimum is 1 kg — we batch, we do not retire per prompt.
2. Real retirement is Carbonmark (verified credits). Avalanche stores the **receipt**.
3. C-Chain is the EVM contract chain. We did not launch a custom L1.
