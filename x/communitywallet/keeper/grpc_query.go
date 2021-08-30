package keeper

import (
	"github.com/Wallet/CommunityWallet/x/communitywallet/types"
)

var _ types.QueryServer = Keeper{}
