import { LoadingButton } from "@mui/lab"
import { Alert, Box, Button, Stack, TextField } from "@mui/material"
import { useFormik } from "formik"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { toast } from "react-toastify"
import * as Yup from "yup"
import userApi from "../../api/modules/userApi"
import { setAuthModalOpen } from "../../redux/features/authModalSlice"
import { setUser } from "../../redux/features/userSlice"

const SignupForm = ({ switchAuthState }) => {
  const dispatch = useDispatch()

  const [isLoginRequest, setIsLoginRequest] = useState(false)
  const [errorMessage, setErrorMessage] = useState()

  const signinForm = useFormik({
    initialValues: {
      username: "",
      displayName: "",
      password: "",
      confirmPassword: ""
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(8, "Username minimum 8 character")
        .required("You must fill in your username"),
      displayName: Yup.string()
        .min(8, "Display Name minimum 8 character")
        .required("You must fill in your display name"),
      password: Yup.string()
        .min(8, "Password minimum 8 character")
        .required("You must fill in your password"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password")], "Password confirmation does not match")
        .min(8, "Password Confirmation minimum 8 character")
        .required("You must fill in your password confirmation")
    }),
    onSubmit: async (values) => {
      setErrorMessage(undefined)
      setIsLoginRequest(true)
      console.log("register")
      const { response, err } = await userApi.signup(values)
      setIsLoginRequest(false)

      if (response) {
        signinForm.resetForm()
        dispatch(setUser(response))
        dispatch(setAuthModalOpen(false))
        toast.success("Sign in successful")
      }

      if (err) setErrorMessage(err.message)
    }
  })

  return (
    <Box component="form" onSubmit={signinForm.handleSubmit}>
      <Stack spacing={3}>
        <TextField
          type="text"
          label="Username"
          placeholder="Username"
          name="username"
          fullWidth
          value={signinForm.values.username}
          onChange={signinForm.handleChange}
          color="success"
          error={
            signinForm.touched.username &&
            signinForm.errors.username !== undefined
          }
          helperText={signinForm.touched.username && signinForm.errors.username}
        />
        <TextField
          type="text"
          label="Display Name"
          placeholder="Display Name"
          name="displayName"
          fullWidth
          value={signinForm.values.displayName}
          onChange={signinForm.handleChange}
          color="success"
          error={
            signinForm.touched.displayName &&
            signinForm.errors.displayName !== undefined
          }
          helperText={
            signinForm.touched.displayName && signinForm.errors.displayName
          }
        />
        <TextField
          type="password"
          label="Password"
          placeholder="Password"
          name="password"
          fullWidth
          value={signinForm.values.password}
          onChange={signinForm.handleChange}
          color="success"
          error={
            signinForm.touched.password &&
            signinForm.errors.password !== undefined
          }
          helperText={signinForm.touched.password && signinForm.errors.password}
        />
        <TextField
          type="password"
          label="Password Confirmation"
          placeholder="Password Confirmation"
          name="confirmPassword"
          fullWidth
          value={signinForm.values.confirmPassword}
          onChange={signinForm.handleChange}
          color="success"
          error={
            signinForm.touched.confirmPassword &&
            signinForm.errors.confirmPassword !== undefined
          }
          helperText={
            signinForm.touched.confirmPassword &&
            signinForm.errors.confirmPassword
          }
        />
      </Stack>

      <LoadingButton
        type="submit"
        fullWidth
        size="large"
        variant="contained"
        sx={{ marginTop: 4 }}
        loading={isLoginRequest}
      >
        sign up
      </LoadingButton>

      <Button fullWidth sx={{ marignTop: 1 }} onClick={() => switchAuthState()}>
        sign in
      </Button>

      {errorMessage && (
        <Box sx={{ marginTop: 2 }}>
          <Alert severity="error" variant="outlined">
            {errorMessage}
          </Alert>
        </Box>
      )}
    </Box>
  )
}

export default SignupForm
