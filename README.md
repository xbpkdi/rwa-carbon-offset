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

**Deployed contract (Fuji):** `0x9dd6ae803cab0bd07b4cbc09fab3bc30f7357cc1`

- Contract: https://testnet.snowtrace.io/address/0x9dd6ae803cab0bd07b4cbc09fab3bc30f7357cc1
- Deploy tx: https://testnet.snowtrace.io/tx/0xf8359adacc9a3618eb9a39e8263fcd66f940e93e775c4966124b25dee2c633b2

Snowtrace: https://testnet.snowtrace.io

# Demo

```bash
cp .env apps/web/.env.local
npm run dev
```

Open http://localhost:3000

Four screens: `/` `/estimate` `/checkout` `/certificate/[id]`

Checkout is a Phase-1 shortcut (no Stripe): it calls Carbonmark then `record()` on Fuji when the recorder key is set.

End-to-end check (dev server running):

```bash
npm run e2e:demo
# if port 3000 is busy: E2E_BASE_URL=http://localhost:3001 npm run e2e:demo
```

Fuji deploy needs test AVAX on the recorder wallet tied to `FUJI_PRIVATE_KEY`:
https://core.app/tools/testnet-faucet/?subnet=c&token=c

Then `npm run deploy:fuji`

## Demo talking points (2 min)

1. One AI query is ~0.03–3 g; the chain minimum is 1 kg — we batch, we do not retire per prompt.
2. Real retirement is Carbonmark (verified credits). Avalanche stores the **receipt**.
3. C-Chain is the EVM contract chain. We did not launch a custom L1.
