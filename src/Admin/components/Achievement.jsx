import { Box, Button, Card, CardContent, CardHeader, Typography, styled } from '@mui/material'
import React from 'react'

const TrignnleImg = styled("img")({
    right: 0,
    bottom: 0,
    height: 170,
    // position: 'absolute'
})

const TrophyImg = styled("img")({
    right: 36,
    bottom: 20,
    height: 98,
    // position: 'absolute'
})

const Achievement = () => {
  return (
    <Card className='' sx={{position: 'relative', bgcolor: '#242B2E', color: 'white'}}>
    <CardHeader title="Nari Vastaram" />
  <CardContent>
    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between"}}>
      <Box>
        {/* <Typography variant="h6" sx={{ letterSpacing: ".25px", mb: 1 }}>
          Nari Vastaram
        </Typography> */}
        <Typography sx={{ fontWeight: 500 }}>
          Congratulations
        </Typography>
        <Typography sx={{ mb: 2, fontSize: "1.25rem", fontWeight: 700 }}>
          420.8k
        </Typography>
        <Button size="small" variant="contained">
          View Sales
        </Button>
      </Box>
      <Box sx={{ ml: 10 }}>
        <TrophyImg src=''></TrophyImg>
      </Box>
      <Box sx={{ ml: 10 }}>
        <TrophyImg src='https://png.pngtree.com/png-vector/20250213/ourmid/pngtree-elegant-gold-trophy-cup-award-championship-victory-symbol-sports-competition-prize-png-image_15444013.png'></TrophyImg>
      </Box>
    </Box>
  </CardContent>
</Card>

  )
}

export default Achievement