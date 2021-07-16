import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import UserContext from '../Context'
import { Link } from 'react-router-dom'
import dataService from '../services/dataService'

import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import InputLabel from '@material-ui/core/InputLabel'
import InputAdornment from '@material-ui/core/InputAdornment'
import FormControl from '@material-ui/core/FormControl'
import IconButton from '@material-ui/core/IconButton'
import OutlinedInput from '@material-ui/core/OutlinedInput'

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(20),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}))

const RegisterPage = () => {
    const history = useHistory()
    const context = useContext(UserContext)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [rePassword, setRePassword] = useState('')

    const [showPassword, setShowPassword] = useState(false)
    const [showRePassword, setShowRePassword] = useState(false)
    const classes = useStyles()

    const onSubmit = async (e) => {
        e.preventDefault()

        const promise = await dataService({
            method: 'POST', url: '/user/register',
            data: { email, password, rePassword }
        })
        const authToken = promise.headers.get('Authorization')
        document.cookie = `auth-token=${authToken}`
        const response = await promise.json()

        if (response.email && authToken) {
            context.logIn({ email: response.email, id: response._id })
            history.push(`/`)
        } else {
            console.error(response.error)
        }
    }

    const handleClickShowPassword = () => { setShowPassword(!showPassword) }
    const handleClickShowRePassword = () => { setShowRePassword(!showRePassword) }

    return (
        <Container component="main" maxWidth="xs" >
            <CssBaseline />
            <div className={classes.paper}>
                <form noValidate onSubmit={onSubmit} className={classes.form}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label='Email Address'
                        name="email"
                        autoComplete="email"
                        autoFocus
                        onChange={(event) => setEmail(event.target.value)}
                    />
                    <FormControl fullWidth variant="outlined" required margin="normal">
                        <InputLabel>Password</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            onChange={(event) => setPassword(event.target.value)}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                    <FormControl fullWidth variant="outlined" required margin="normal">
                        <InputLabel>Confirm Password</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-repassword"
                            type={showRePassword ? 'text' : 'password'}
                            onChange={(event) => setRePassword(event.target.value)}
                            name='password'
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowRePassword}
                                        edge="end"
                                    >
                                        {showRePassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                    <Button type="submit" fullWidth variant="contained" color='primary' className={classes.submit}>Sign Up </Button>
                    <Grid container>
                        <Grid item xs> </Grid>
                        <Grid item ><Link to="/login" variant="body2">Already have an account? Sign in</Link> </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    )
}

export default RegisterPage