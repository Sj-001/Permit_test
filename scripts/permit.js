const { ethers } = require("hardhat");
const PermitABI = require("../artifacts/contracts/Permit.sol/MyToken.json");
const permitAddress = "0xd9d8B718Aa40e26EE3f76B7E0B6A8B76A451E235";

async function main() {
  const signer = await ethers.getSigner();
  var permitContract = new ethers.Contract(
    permitAddress,
    PermitABI.abi,
    signer
  );
  console.log("permit");
  await permitContract.mint(signer.address, 100);

  const types = {
    Permit: [
      {
        name: "owner",
        type: "address",
      },
      {
        name: "spender",
        type: "address",
      },
      {
        name: "value",
        type: "uint256",
      },
      {
        name: "nonce",
        type: "uint256",
      },
      {
        name: "deadline",
        type: "uint256",
      },
    ],
  };

  const domain = {
    name: "MyToken",
    version: "1",
    chainId: 5,
    verifyingContract: permitAddress,
  };
  var nonce = await permitContract.nonces(signer.address);
  var deadline = 1672081461;

  const value = {
    owner: signer.address,
    spender: permitAddress,
    value: 100,
    nonce: nonce,
    deadline: deadline,
  };

  var signature = await signer._signTypedData(domain, types, value);
  console.log("permit 2");

  const r = "0x" + signature.substring(0, 64);
  const s = "0x" + signature.substring(64, 128);
  const v = parseInt(signature.substring(128, 130), 16);
  console.log(v, r, s);
  // var tx = await permitContract.permit(
  //   signer.address,
  //   permitAddress,
  //   100,
  //   deadline,
  //   v,
  //   r,
  //   s
  // );

  // await tx.wait();
  // console.log("permit 3");
  // var txTrans = await permitContract.transferTokensTo(
  //   "0x248d913b0a6841159e5e6ee6205bb47f53da945b",
  //   100
  // );
  // await txTrans.wait();

  // var balance = await permitContract.balanceOf(
  //   "0x248d913b0a6841159e5e6ee6205bb47f53da945b"
  // );

  // console.log("New balance is: ", balance);
}

main();
