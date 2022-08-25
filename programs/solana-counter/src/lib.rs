use anchor_lang::prelude::*;

declare_id!("5U44h9RTCKSm1vCTn6pjhS8xQofxFv27tjzh1zxqD58k");

#[program]
pub mod solana_counter {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
