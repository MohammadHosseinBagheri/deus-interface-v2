import { Token } from '@sushiswap/core-sdk'
import { DEUS_TOKEN, DEUS_VDEUS_LP_TOKEN, XDEUS_TOKEN } from 'constants/tokens'
import { useGetDeusApy, useV2GetApy } from 'hooks/useStakingInfo'
import { MasterChefV3, StablePool_DEUS_vDEUS } from './addresses'
import { SupportedChainId } from './chains'

export enum StakingVersion {
  V1,
  V2,
  NFT,
  EXTERNAL,
}

export type ProvideTokens = {
  id: number
  title: string
  link: string
}

export type StakingType = {
  id: number
  name: string
  rewardTokens: Token[]
  token?: Token
  provideLink?: string
  aprHook: (h: StakingType) => number
  secondaryAprHook: (liqPool?: any, stakingPool?: any) => number
  masterChef: string
  pid: number
  active: boolean
  hasSecondaryApy?: boolean
  version: StakingVersion
  isSingleStaking?: boolean
}

export type LiquidityType = {
  id: number
  label: string
  tokens: Token[]
  provideLinks?: ProvideTokens[]
  lpToken: Token
  contract?: string
  priceToken?: Token
}

export const LiquidityPool: LiquidityType[] = [
  {
    id: 0,
    label: 'xDEUS - DEUS Staking',
    tokens: [XDEUS_TOKEN, DEUS_TOKEN],
    provideLinks: [
      { id: 0, title: 'Go to Swap Page', link: '/xdeus/swap' },
      {
        id: 1,
        title: 'Buy on Firebird',
        link: 'https://app.firebird.finance/swap?outputCurrency=0xDE5ed76E7c05eC5e4572CfC88d1ACEA165109E44&net=250',
      },
    ],
    lpToken: DEUS_VDEUS_LP_TOKEN,
    contract: StablePool_DEUS_vDEUS[SupportedChainId.FANTOM],
    priceToken: DEUS_TOKEN,
  },
  {
    id: 1,
    label: 'xDEUS Single Staking',
    tokens: [XDEUS_TOKEN], // TODO: remove
    lpToken: XDEUS_TOKEN,
    priceToken: DEUS_TOKEN,
  },
]

export const Stakings: StakingType[] = [
  {
    id: 0,
    name: 'DEUS-xDEUS',
    rewardTokens: [XDEUS_TOKEN, DEUS_TOKEN],
    token: DEUS_VDEUS_LP_TOKEN,
    aprHook: useV2GetApy,
    secondaryAprHook: useGetDeusApy,
    masterChef: MasterChefV3[SupportedChainId.FANTOM],
    pid: 2,
    active: true,
    hasSecondaryApy: true,
    version: StakingVersion.V2,
  },
  {
    id: 1,
    name: 'xDEUS',
    rewardTokens: [XDEUS_TOKEN],
    token: XDEUS_TOKEN,
    aprHook: useV2GetApy,
    secondaryAprHook: useGetDeusApy, // it doesn't return any deus reward for this pool, but you can't have conditional hooks. But the hook handles this scenario internally
    masterChef: MasterChefV3[SupportedChainId.FANTOM],
    pid: 0,
    active: true,
    hasSecondaryApy: false,
    version: StakingVersion.V2,
    isSingleStaking: true,
  },
]
