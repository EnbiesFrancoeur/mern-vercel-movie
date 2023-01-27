import { LoadingButton } from "@mui/lab"
import { Box, Stack, TextField } from "@mui/material"
import { useFormik } from "formik"
import * as Yup from "yup"
import Container from "../components/common/Container"
import uiConfigs from "../configs/uiConfigs"
import { useState } from "react"
import { toast } from "react-toastify"
import userApi from "../api/modules/userApi"

const PasswordUpdate = () => {
  const [onRequest, setOnRequest] = useState(false)

  const form = useFormik({
    initialValues: {
      password: "",
      newPassword: "",
      confirmNewPassword: ""
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .min(8, "password minimum 8 character")
        .required("You must fill in your Password"),
      newPassword: Yup.string()
        .min(8, "New Password minimum 8 character")
        .required("You must fill in your New Password"),
      confirmNewPassword: Yup.string()
        .oneOf(
          [Yup.ref("newPassword")],
          "Your new password confirmation is incorrect"
        )
        .min(8, "Confirm New Password minimum 8 character")
        .required("You must fill in your New Password Confirmation")
    }),
    onSubmit: async (values) => onUpdate(values)
  })

  const onUpdate = async (values) => {
    if (onRequest) return
    setOnRequest(true)

    const { response, err } = await userApi.passwordUpdate(values)

    setOnRequest(false)

    if (err) toast.error(err.message)
    if (response) {
      form.resetForm()

      toast.success(
        "Password updated successfully, Try re-login with your new password"
      )
    }
  }
  return (
    <Box sx={{ ...uiConfigs.style.mainContent }}>
      <Container header="update password">
        <Box component="form" maxWidth="400px" onSubmit={form.handleSubmit}>
          <Stack spacing={2}>
            <TextField
              type="password"
              label="Password"
              placeholder="Password"
              name="password"
              fullWidth
              value={form.values.password}
              onChange={form.handleChange}
              color="success"
              error={
                form.touched.password && form.errors.password !== undefined
              }
              helperText={form.touched.password && form.errors.password}
            />
            <TextField
              type="password"
              label="New Password"
              placeholder="New Password"
              name="newPassword"
              fullWidth
              value={form.values.newPassword}
              onChange={form.handleChange}
              color="success"
              error={
                form.touched.newPassword &&
                form.errors.newPassword !== undefined
              }
              helperText={form.touched.newPassword && form.errors.newPassword}
            />
            <TextField
              type="New Password Confirmation"
              label="New Password Confirmation"
              placeholder="Password"
              name="confirmNewPassword"
              fullWidth
              value={form.values.confirmNewPassword}
              onChange={form.handleChange}
              color="success"
              error={
                form.touched.confirmNewPassword &&
                form.errors.confirmNewPassword !== undefined
              }
              helperText={
                form.touched.confirmNewPassword &&
                form.errors.confirmNewPassword
              }
            />
            <LoadingButton
              type="submit"
              variant="contained"
              fullWidth
              sx={{ marginTop: 4 }}
              loading={onRequest}
            >
              update password
            </LoadingButton>
          </Stack>
        </Box>
      </Container>
    </Box>
  )
}

export default PasswordUpdate
