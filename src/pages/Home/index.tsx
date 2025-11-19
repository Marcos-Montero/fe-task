import { Box, Container, Typography, Button } from "@mui/material"
import { observer } from "mobx-react"
import { useState } from "react"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemText from "@mui/material/ListItemText"
import { useTranslation, Trans } from "react-i18next"
import { SolutionPanel } from "../../components/SolutionPanel"

const Home = () => {
  const { t } = useTranslation()
  const [openSolutionIndex, setOpenSolutionIndex] = useState<number | null>(
    null
  )

  const handleOpenSolution = (index: number) => {
    setOpenSolutionIndex(index)
  }

  const handleCloseSolution = () => {
    setOpenSolutionIndex(null)
  }

  return (
    <Box p={2} maxHeight="calc(100vh - 64px)" overflow={["auto", "auto"]}>
      <Container>
        <Typography variant="h1" textAlign="center">
          {t("home.welcome")}
        </Typography>
        <Typography variant="subtitle1" textAlign="center">
          <Trans i18nKey="home.intro" components={{ b: <b /> }} />
        </Typography>
        <Typography variant="body2" textAlign="center" color="textSecondary">
          {t("home.sidenote")}
        </Typography>
        <List sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {Array.from({ length: 5 }).map((_, index: number) => (
            <ListItem
              key={index}
              sx={{
                border: "1px solid #92ecad",
                p: 2,
                borderRadius: 2,
                backgroundColor: "#e2eee4",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-start",
                gap: 2,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  fontSize: 24,
                }}
              >
                {t(
                  `issues.${
                    index.toString() as "0" | "1" | "2" | "3" | "4"
                  }.icon`
                )}
              </Box>
              <ListItemText
                primary={t(
                  `issues.${
                    index.toString() as "0" | "1" | "2" | "3" | "4"
                  }.title`
                )}
                secondary={t(
                  `issues.${
                    index.toString() as "0" | "1" | "2" | "3" | "4"
                  }.description`
                )}
              />
              <Button
                variant="outlined"
                onClick={() => handleOpenSolution(index)}
                sx={{
                  px: 2,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 1,
                  minWidth: 200,
                  textTransform: "none",
                  whiteSpace: "nowrap",
                  backgroundColor: "success.main",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "success.light",
                  },
                }}
              >
                ✅ {t("home.seeSolution")}
              </Button>
            </ListItem>
          ))}
        </List>
      </Container>
      <SolutionPanel
        open={openSolutionIndex !== null}
        onClose={handleCloseSolution}
        issueIndex={openSolutionIndex}
      />
    </Box>
  )
}

export default observer(Home)
