import { SignerWithAddress } from '@nomicfoundation/hardhat-ethers/signers'
import { expect } from 'chai'
import hre from 'hardhat'
import { ethers } from 'hardhat'

describe('Counter Test', function () {
  async function deployCounter() {
    let initial_value = BigInt(0)
    const publicClient = await hre.viem.getPublicClient()
    const counterContract = await hre.viem.deployContract('Counter', [initial_value])

    return {
      counterContract,
      publicClient
    }
  }

  describe('Deployment', function () {
    it('Should deploy Counter', async function () {
      const { counterContract } = await deployCounter()
      expect(counterContract.address).to.not.be.undefined
    })

    it('Should have initial value of 0', async function () {
      const { counterContract } = await deployCounter()
      expect(await counterContract.read.getCount()).to.equal(BigInt(0))
    })
  })

  describe('Increment', function () {
    it('Should increment the counter', async function () {
      const { counterContract, publicClient } = await deployCounter()
      await counterContract.write.increment({ value: BigInt(1) })
      expect(await counterContract.read.getCount()).to.equal(BigInt(1))
      expect(
        await publicClient.getBalance({
          address: counterContract.address
        })
      ).to.equal(BigInt(1))
    })
  })

  describe('Decrement', function () {
    it('Should decrement the counter', async function () {
      const { counterContract, publicClient } = await deployCounter()
      let signer: SignerWithAddress = (await ethers.getSigners())[1]
      let beforeBalance = await ethers.provider.getBalance(signer.address)
      await counterContract.write.increment({ account: signer.address as `0x${string}`, value: BigInt(1) })
      await counterContract.write.decrement({ account: signer.address as `0x${string}` })
      let afterBalance = await ethers.provider.getBalance(signer.address)
      expect(await counterContract.read.getCount()).to.equal(BigInt(0))
      expect(
        await publicClient.getBalance({
          address: counterContract.address
        })
      ).to.equal(BigInt(0))
      expect(afterBalance).to.equal(beforeBalance)
    })
  })
})
