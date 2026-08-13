# Phase 0 results

## Carbonmark REST — succeeded

- Host used: `https://v19.api.carbonmark.com` (`v1.api.carbonmark.com` TLS cert expired May 2024)
- Marketplace listings had `liquidSupply: 0`; used `assetPriceType=klimaprotocol`
- GET `/orders?quote_uuid=` returns an **array**
- Status path: SUBMITTED → COMMITTED → COMPLETED (~2s)
- tx: `0x6693fd3aa6610c4ce86ce3e8b1f245e4c0f0d91885e06aa18a43d00bbd92ae8b`
- certificate: https://app.carbonmark.com/retirements/id/8453-0x6693fd3aa6610c4ce86ce3e8b1f245e4c0f0d91885e06aa18a43d00bbd92ae8b-0

## Avalanche Fuji C-Chain — Phase 1b done

Contract compiled and deployed.

- **Contract:** `0x9dd6ae803cab0bd07b4cbc09fab3bc30f7357cc1`
- **Deploy tx:** https://testnet.snowtrace.io/tx/0xf8359adacc9a3618eb9a39e8263fcd66f940e93e775c4966124b25dee2c633b2
- **Example record tx:** https://testnet.snowtrace.io/tx/0xcfcc942bafb6357cc7ea40495cd3d6236136e3330c3ffe0a0dc28c6c661f5f15
- **Recorder wallet:** `0xc2bbC763Fb7Cd6d6EFb37cafc0A4C59c52D6c04b`

Set in `.env` / `apps/web/.env.local` (never commit):

- `FUJI_PRIVATE_KEY`
- `CERTIFICATE_RECEIPT_ADDRESS=0x9dd6ae803cab0bd07b4cbc09fab3bc30f7357cc1`

Faucet: https://core.app/tools/testnet-faucet/?subnet=c&network=fuji

`npm run e2e:demo` passes with Carbonmark + Snowtrace links when env is set.

## Klima x402

Discover on `v1.x402.klimalabs.com` works (carbon classes + liquidity). Full gasless `actions/retire` needs `KLIMA_PRIVATE_KEY` and Base Sepolia USDC — not completed. Carbonmark rail already retired via Klima protocol inventory on Base (`8453`).
