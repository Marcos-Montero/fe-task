import {
  Grow,
  Box,
  Theme,
  Toolbar,
  Typography,
  Button,
  Menu,
  MenuItem,
} from "@mui/material"
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar"
import { styled, useTheme } from "@mui/material/styles"
import React, { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import Icon from "@mdi/react"
import { mdiChevronDown } from "@mdi/js"
import { User } from "../../api/services/User/store"
import AvatarMenu from "../AvatarMenu"

type AppBarProps = MuiAppBarProps & {
  theme?: Theme
}

type AppHeaderProps = {
  user: User
  pageTitle: string
}

const typoStyle = {
  display: "flex",
  alignContent: "center",
  justifyContent: "center",
  lineHeight: 1,
}

const AppBar = styled(MuiAppBar)<AppBarProps>(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  backgroundColor: theme.palette.common.black,
  color: theme.palette.common.white,
  height: theme.tokens.header.height,
}))

type LanguageOption = {
  code: string
  name: string
  flag: string
}

const languages: LanguageOption[] = [
  { code: "en", name: "EN", flag: "🇬🇧" },
  { code: "de", name: "DE", flag: "🇩🇪" },
]

const AppHeader = React.forwardRef<HTMLElement, AppHeaderProps>(
  (props, ref) => {
    const { user, pageTitle } = props
    const { t, i18n: i18nInstance } = useTranslation()
    const theme = useTheme()
    const oneHourInSeconds = 60 * 60
    const [countDown, setCountDown] = useState(oneHourInSeconds)
    const [language, setLanguage] = useState(i18nInstance.language)
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const open = Boolean(anchorEl)

    const min = Math.floor(countDown / 60)
      .toString()
      .padStart(2, "0")
    const sec = (countDown % 60).toString().padStart(2, "0")

    const currentLanguage =
      languages.find((lang) => lang.code === language) || languages[0]

    useEffect(() => {
      const handleLanguageChange = (lng: string) => {
        setLanguage(lng)
      }
      i18nInstance.on("languageChanged", handleLanguageChange)
      return () => {
        i18nInstance.off("languageChanged", handleLanguageChange)
      }
    }, [i18nInstance])

    const handleLanguageMenuClick = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget)
    }

    const handleLanguageMenuClose = () => {
      setAnchorEl(null)
    }

    const handleLanguageSelect = (langCode: string) => {
      if (langCode === "en" || langCode === "de") {
        i18nInstance.changeLanguage(langCode)
      }
      handleLanguageMenuClose()
    }

    useEffect(() => {
      const interval = setInterval(() => {
        setCountDown((c) => {
          if (c <= 1) {
            clearInterval(interval)
            return 0
          }
          return c - 1
        })
      }, 1000)
      return () => clearInterval(interval)
    }, [])

    return (
      <AppBar ref={ref} position="fixed" sx={{ width: "100vw" }}>
        <Toolbar sx={{ background: "#08140C 0% 0% no-repeat padding-box" }}>
          <Box
            sx={{
              width: "100%",
              flexDirection: "row",
              display: "flex",
              gap: 2,
            }}
          >
            <Box>
              <Typography variant="h6" component="h6" color="primary">
                {min}:{sec}
                {countDown === 0 && " - " + t("timeIsUp")}
              </Typography>
            </Box>
            <Box sx={{ width: 20, height: 20, flex: 1 }} />
            <Box sx={{ flex: 2 }}>
              <Typography
                sx={{
                  ...typoStyle,
                  color: theme.palette.primary.main,
                  mb: theme.spacing(0.5),
                }}
                variant="h6"
                component="div"
              >
                {t("appTitle").toLocaleUpperCase()}
              </Typography>
              <Typography
                sx={{ ...typoStyle }}
                variant="overline"
                component="div"
                noWrap
              >
                {pageTitle.toLocaleUpperCase()}
              </Typography>
            </Box>
            <Box sx={{ flex: 1, justifyContent: "flex-end", display: "flex" }}>
              {user && user.eMail && (
                <Grow in={Boolean(user && user.eMail)}>
                  <Box>
                    <AvatarMenu user={user} />
                  </Box>
                </Grow>
              )}
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Button
                onClick={handleLanguageMenuClick}
                sx={{
                  backgroundColor: "transparent",
                  color: theme.palette.common.white,
                  borderRadius: "8px",
                  textTransform: "none",
                  px: 2,
                  py: 1,
                  minWidth: "auto",
                }}
              >
                <Box component="span" sx={{ mr: 1, fontSize: "16px" }}>
                  🌐
                </Box>
                <Typography variant="body2" component="span">
                  {currentLanguage.name}
                </Typography>
                <Icon
                  path={mdiChevronDown}
                  size={0.75}
                  style={{ marginLeft: "8px" }}
                />
              </Button>
              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleLanguageMenuClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                PaperProps={{
                  sx: {
                    mt: 1,
                    borderRadius: "8px",
                    width: "96px",
                    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                    color: theme.palette.common.white,
                    backgroundColor: theme.palette.primary.main,
                    padding: 0,
                  },
                }}
              >
                <Box>
                  {languages
                    .filter((lang) => lang.code !== currentLanguage.code)
                    .map((lang) => (
                      <MenuItem
                        key={lang.code}
                        onClick={() => handleLanguageSelect(lang.code)}
                        sx={{
                          "&:hover": {
                            backgroundColor: "rgba(255, 255, 255, 0.1)",
                          },
                          "&.Mui-disabled": {
                            opacity: 0.5,
                          },
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                          }}
                        >
                          <Box component="span" sx={{ fontSize: "16px" }}>
                            {lang.flag}
                          </Box>
                          <Typography variant="body2">{lang.name}</Typography>
                        </Box>
                      </MenuItem>
                    ))}
                </Box>
              </Menu>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
    )
  }
)

export default AppHeader
