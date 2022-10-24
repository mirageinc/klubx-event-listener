import postgres from "postgres";
import "dotenv/config";

const sql = postgres(process.env.DATABASE_URI, {
  transform: postgres.camel,
});

const wallets = [
  "0xed42186b431fc68b7bb49a31be4c982a95b2c965",
  "0x35c4d7858597ded39326f27d60f2a2de84cad503",
  "0xcb23d9d5d014edd58be95056c7d0885589413994",
  "0xee81a1bc1034b0906b132c98bed477b896b731da",
  "0xf14afa6a2960a3e79a9a1d617405907f67a7f9d4",
  "0x303052148a78a692d7aa89bad454f3e91785488d",
  "0xcbb9ab939e21ceccaffe2b4c0591255336dbd9d8",
  "0xb60211811a4977b5f4b65a1d2d27a2591d73d1ac",
  "0xdff7eff9cab4633838daea6f5cd59e1d395bd8b6",
  "0xc4505db8cc490767fa6f4b6f0f2bdd668b357a5d",
  "0x07f4f4ad75e0b6b32d2703f8426ce5db083276f1",
  "0xc213e5d1ba49e3069b7ed5ce1f53ed299b966c73",
  "0x4e613d6ab29892cd14544dc600b5cc301f371e20",
  "0x8d32ea78ad73037c56a606b1bfd0fe6c596e0ab5",
  "0x1c78a76c0b4a4c2f99ad8d0abb7a1556fa55df59",
  "0xa679c6154b8d4619af9f83f0bf9a13a680e01ecf",
  "0x61c371ba956c7f2fbe0913843de98c5e55be8ee7",
  "0xd99d96fd90cf9f52f8ad96d252ded0ec77f3d239",
  "0x0d7b35d672a35cf21f707853810c467fabec6b6b",
  "0x1c9ee95a3f63e4cd7e0067485acb1c694826b534",
  "0x056640dbea17979292bc0056a3ee7e259ad03927",
  "0x1616b4c7cdb4093befbcca62f3198993327a8e9e",
  "0xbbdac7ba85af15420afd1f4aa3313c3535b15cde",
  "0xfded90a3b1348425577688866f798f94d77a0d02",
  "0xc1064e3662b0718357e9050694a3bfeaabede8ab",
  "0x3aa01cf5e869d88fb4517798db6a95a6ecd2c001",
  "0xeb1c22baacafac7836f20f684c946228401ff01c",
  "0x8ad52c3ab4233341f7a5b25dd0ebc4dcc26c53ee",
  "0x3c6aeff92b4b35c2e1b196b57d0f8ffb56884a17",
  "0x58c17f3ded16162f559bc590b7cff18a657ddaf4",
  "0x3becf83939f34311b6bee143197872d877501b11",
  "0xa0eaf6b0df87132c9a28e450a43c1d906defb60b",
  "0xc6c478f3b11cba17be3aacc601eaf671f6dbe5cc",
  "0x82a8dd0bd212a47780132cc2d1aa56a70e7fd9e9",
  "0xb8208d1b9aad7e6404c7ec8a9039f3215673ee3e",
  "0x56691e56f68a610897ef1790accf7c882abec581",
  "0x9db9baaaca45dd854d8952cdc5d1161e37783f80",
  "0x0e04bbacba3e476038491092cd2fa83e5396296b",
  "0x84dffb9c67aec4503f65c7ff86568446798baa17",
  "0xa4a8d44646e2f4c4a74b892303a13c85fb876338",
  "0x7f6f76d22d2c5130f2da38d0691748d1b61c19d4",
  "0x57fff280dc4f868adf3ef66a8a3707a4f0502229",
  "0x9ef246d5f579d1513a50733f17a23479c71e6d1a",
  "0xe0036fb4b5a3b232acfc01fec3bd1d787a93da75",
  "0xb4c27f85d7659e0cf72f479693c564e61472cb57",
  "0xd396b4b319995b2227f3abe3c170b1affa16dde3",
  "0x0394451c1238cec1e825229e692aa9e428c107d8",
  "0xbea020c3bd417f30de4d6bd05b0ed310ac586cc0",
  "0x5cf40d58e6f0bf2c673d4bba11f2eac0e9e9788d",
  "0x1ffead999b467249afd2efba336a0b6c820e17ac",
  "0xe21dc18513e3e68a52f9fcdacfd56948d43a11c6",
  "0x8ea95bdc5cdddc0b7ebad841f0c1f2ca6168b6a9",
  "0xc5f59709974262c4afacc5386287820bdbc7eb3a",
  "0x4178ccf4ad82a117347eb0afe3a37243eb04f588",
  "0xbf38346e4aebcc844c253ce715263fb4a03552a8",
  "0xb1b1a26d9ea7d875df6dfc5aef260ac99b29d653",
  "0x5e356fc93f2170955283ad202447ef1b8a7ca937",
  "0xea747ac33e229806174228ef63d20234b7561a79",
  "0xcb23d9d5d014edd58be95056c7d0885589413994",
  "0x7a253bd170e3a8c6088acdc912dc34f945f33d4e",
  "0xc438fc7ff0c3cce806c60740818dfd39e88c9b97",
  "0x79c91f03590fceba9b42acec18375cb279e0881e",
  "0xd387a6e4e84a6c86bd90c158c6028a58cc8ac459",
  "0x8c2b143b0276bafd2613bb41d7058583cf6706c7",
  "0xf0d6999725115e3ead3d927eb3329d63afaec09b",
  "0xc86b12d850fdbbf3260a7baae862f85857aadbba",
  "0x701895f6c6777bec3da9c2c052b7bf5d766791e2",
  "0xc255bbf72691f6363c7f96e475f48786e62de4c5",
  "0xff0bd4aa3496739d5667adc10e2b843dfab5712b",
  "0xa6d3a33a1c66083859765b9d6e407d095a908193",
  "0xed42186b431fc68b7bb49a31be4c982a95b2c965",
];

sql.listen("new_log", async (blockNumber) => {
  // blockNumber = 15819063;

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
		  count(contract_address) over (partition by contract_address) as ct
	  from
		  ethereum.log
		  join ethereum.transaction on log.transaction_hash = transaction.hash
	  where
		  topics [3] in ${sql(topics)}
			and log.block_number = ${blockNumber}	
			) as t
  where
	  ct = 1`;

  if (newFirstNftTransfers.length) {
    console.log(newFirstNftTransfers);
  }
});
