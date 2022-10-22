import postgres from "postgres";
import "dotenv/config"

const sql = postgres(process.env.DATABASE_URI, {
  transform: postgres.camel,
});

const wallets = ["0xCB23d9D5d014Edd58Be95056C7D0885589413994"];

sql.listen("new_log", async (blockNumber) => {
  //blockNumber = 14829493;

  const topics = wallets.map(
    (s) => "0x000000000000000000000000" + s.slice(2).toLowerCase()
  ); // transform raw address to topic (second topic of `Transfer(from, to, tokenId)`

  const newFirstNftTransfers = await sql`
  select
	  value,
	  contract_address,
	  concat('0x', substring(topics [2] from 27)) as sender,
	  concat('0x', substring(topics [3] from 27)) as receiver,
	  concat('0x', substring(topics [4] from 27)) as token_id
  from (
	  select
		  *,
		  log.block_number as bn,
		  count(contract_address) over (partition by contract_address) as ct
	  from
		  ethereum.log
		  join ethereum.transaction on log.transaction_hash = transaction.hash
	  where
		  topics [3] in ${sql(topics)}) as t
  where
	  ct = 1 and bn = ${blockNumber}`;

  if (newFirstNftTransfers.length) {
    console.log(newFirstNftTransfers);
  }
});

