import postgres from "postgres";
import "dotenv/config";

const sql = postgres(process.env.DATABASE_URI, {
  transform: postgres.camel,
});

export async function get_erc721_transfers(contract_address, token_id) {
  let res = null;

  contract_address = contract_address.toLowerCase();
  const tokenId_hex = token_id.toString(16);
  const data = "0x" + tokenId_hex.padStart(68 - tokenId_hex.length, "0");

  contract_address = contract_address.toLowerCase();

  if (contract_address == "0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb")
    res = await sql`select transaction_hash, 
    concat('0x', substring(topics[2] from 27)) AS sender,
    concat('0x', substring(topics[3] from 27)) AS receiver,
    ethereum.hex_to_int(ethereum.skip_zeros(data)) AS token_id
    from   ethereum.log
    where  lower(contract_address) = ${contract_address} and
    topics[1] = '0x05af636b70da6819000c49f85b21fa82081c632069bb626f30932034099107d8' and
    data = ${data};`;
  else
    res = await sql`select transaction_hash, 
    concat('0x', substring(topics[2] from 27)) AS sender,
    concat('0x', substring(topics[3] from 27)) AS receiver,
    ethereum.hex_to_int(ethereum.skip_zeros(topics[4])) AS token_id
    from   ethereum.log
    where  lower(contract_address) = ${contract_address} and
    topics[1] = '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef' and 
    topics[4] = ${data};`;

  return res;
}


console.log(await get_erc721_transfers("0xb7f7f6c52f2e2fdb1963eab30438024864c313f6", 9691));
