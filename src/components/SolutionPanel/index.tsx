import {
  Box,
  Drawer,
  IconButton,
  Typography,
  Link,
  Paper,
} from "@mui/material"
import { mdiClose, mdiContentCopy } from "@mdi/js"
import Icon from "@mdi/react"
import { useTranslation } from "react-i18next"

type SolutionPanelProps = {
  open: boolean
  onClose: () => void
  issueIndex: number | null
}

const FileLink = ({ filePath, lineNumber }: { filePath: string; lineNumber?: number }) => {
  const handleClick = async () => {
    const fileReference = `${filePath}${lineNumber ? `:${lineNumber}` : ""}`
    
    try {
      await navigator.clipboard.writeText(fileReference)
      console.log(`File path copied to clipboard: ${fileReference}`)
      
      const vscodeUrl = `vscode://file/${fileReference}`
      try {
        window.location.href = vscodeUrl
      } catch {
      }
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
      }}
    >
      <Link
        component="button"
        onClick={handleClick}
        sx={{
          color: "primary.main",
          textDecoration: "underline",
          cursor: "pointer",
          "&:hover": {
            color: "primary.dark",
          },
          fontFamily: "monospace",
          fontSize: "0.875rem",
          flex: 1,
          textAlign: "left",
        }}
      >
        {filePath}
        {lineNumber && `:${lineNumber}`}
      </Link>
      <IconButton
        size="small"
        onClick={handleClick}
        sx={{ p: 0.5 }}
        title="Copy file path"
      >
        <Icon path={mdiContentCopy} size={0.75} />
      </IconButton>
    </Box>
  )
}

export const SolutionPanel = ({ open, onClose, issueIndex }: SolutionPanelProps) => {
  const { t } = useTranslation()

  if (issueIndex === null) return null

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      SlideProps={{
        timeout: 300,
      }}
      sx={{
        "& .MuiDrawer-paper": {
          width: { xs: "100%", sm: "500px", md: "600px" },
          boxShadow: "-4px 0 20px rgba(0, 0, 0, 0.1)",
        },
      }}
    >
      <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            p: 2,
            borderBottom: "1px solid",
            borderColor: "divider",
          }}
        >
          <Typography variant="h6" component="h2">
            {t(`solutions.${issueIndex}.title`)}
          </Typography>
          <IconButton onClick={onClose} size="small">
            <Icon path={mdiClose} size={1} />
          </IconButton>
        </Box>

        <Box
          sx={{
            flex: 1,
            overflow: "auto",
            p: 3,
          }}
        >
          <Box
            sx={{
              "& p": {
                mb: 2,
                lineHeight: 1.6,
              },
              "& code": {
                backgroundColor: "grey.100",
                padding: "2px 6px",
                borderRadius: "4px",
                fontFamily: "monospace",
                fontSize: "0.875em",
              },
              "& strong": {
                fontWeight: 600,
              },
              "& ul": {
                pl: 3,
                mb: 2,
              },
              "& li": {
                mb: 1,
              },
            }}
            dangerouslySetInnerHTML={{
              __html: t(`solutions.${issueIndex}.content`),
            }}
          />

          {t(`solutions.${issueIndex}.files`, { returnObjects: true }) && (
            <Box sx={{ mt: 3 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                {t("solutions.filesTitle")}
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                {(t(`solutions.${issueIndex}.files`, { returnObjects: true }) as Array<{ path: string; line?: number }>).map(
                  (file, idx) => (
                    <Paper
                      key={idx}
                      sx={{
                        p: 1.5,
                        backgroundColor: "grey.50",
                        border: "1px solid",
                        borderColor: "grey.200",
                      }}
                    >
                      <FileLink filePath={file.path} lineNumber={file.line} />
                    </Paper>
                  )
                )}
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </Drawer>
  )
}

