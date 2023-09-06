import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import * as yup from "yup";
import _ from "@lodash";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import AvatarGroup from "@mui/material/AvatarGroup";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { useEffect } from "react";
import jwtService from "../../auth/services/jwtService";

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
	username: yup.string().required("You must enter a username"),
	password: yup
		.string()
		.required("Please enter your password.")
		.min(4, "Password is too short - must be at least 4 chars."),
});

const defaultValues = {
	username: "",
	password: "",
	remember: true,
};

function SignInPage() {
	const { control, formState, handleSubmit, setError, setValue } = useForm({
		mode: "onChange",
		defaultValues,
		resolver: yupResolver(schema),
	});

	const { isValid, dirtyFields, errors } = formState;

	// useEffect(() => {
	//   setValue('username', 'UserPrueba1', { shouldDirty: true, shouldValidate: true });
	//   setValue('password', 'passwordTest', { shouldDirty: true, shouldValidate: true });
	// }, [setValue]);

	function onSubmit({ username, password }) {
		jwtService
			.signInWithUserAndPassword(username, password)
			.then((user) => {
				// No need to do anything, user data will be set at app/auth/AuthContext
			})
			.catch((_errors) => {
				_errors.forEach((error) => {
					setError(error.type, {
						type: "manual",
						message: error.message,
					});
				});
			});
	}

	return (
		<div className="flex flex-col sm:flex-row items-center md:items-start sm:justify-center md:justify-start flex-1 min-w-0">
			<Paper className="h-full sm:h-auto md:flex md:items-center md:justify-end w-full sm:w-auto md:h-full md:w-1/2 py-8 px-16 sm:p-48 md:p-64 sm:rounded-2xl md:rounded-none sm:shadow md:shadow-none ltr:border-r-1 rtl:border-l-1">
				<div className="w-full max-w-320 sm:w-320 mx-auto sm:mx-0">
					<img
						className="w-48"
						src="assets/images/logo/logo.svg"
						alt="logo"
					/>

					<Typography className="mt-32 text-4xl font-extrabold tracking-tight leading-tight">
						Sign in
					</Typography>
					<div className="flex items-baseline mt-2 font-medium">
						<Typography>Don't have an account?</Typography>
						<Link className="ml-4" to="/sign-up">
							Sign up
						</Link>
					</div>

					<form
						name="loginForm"
						noValidate
						className="flex flex-col justify-center w-full mt-32"
						onSubmit={handleSubmit(onSubmit)}
					>
						<Controller
							name="username"
							control={control}
							render={({ field }) => (
								<TextField
									{...field}
									className="mb-24"
									label="Username"
									autoFocus
									type="text"
									error={!!errors.username}
									helperText={errors?.username?.message}
									variant="outlined"
									required
									fullWidth
								/>
							)}
						/>

						<Controller
							name="password"
							control={control}
							render={({ field }) => (
								<TextField
									{...field}
									className="mb-24"
									label="Password"
									type="password"
									error={!!errors.password}
									helperText={errors?.password?.message}
									variant="outlined"
									required
									fullWidth
								/>
							)}
						/>

						<div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between">
							<Controller
								name="remember"
								control={control}
								render={({ field }) => (
									<FormControl>
										<FormControlLabel
											label="Remember me"
											control={
												<Checkbox
													size="small"
													{...field}
												/>
											}
										/>
									</FormControl>
								)}
							/>

							<Link
								className="text-md font-medium"
								to="/pages/auth/forgot-password"
							>
								Forgot password?
							</Link>
						</div>

						<Button
							variant="contained"
							color="secondary"
							className=" w-full mt-16"
							aria-label="Sign in"
							disabled={_.isEmpty(dirtyFields) || !isValid}
							type="submit"
							size="large"
						>
							Sign in
						</Button>

						{/* <div className="flex items-center mt-32">
              <div className="flex-auto mt-px border-t" />
              <Typography className="mx-8" color="text.secondary">
                Or continue with
              </Typography>
              <div className="flex-auto mt-px border-t" />
            </div>

            <div className="flex items-center mt-32 space-x-16">
              <Button variant="outlined" className="flex-auto">
                <FuseSvgIcon size={20} color="action">
                  feather:facebook
                </FuseSvgIcon>
              </Button>
              <Button variant="outlined" className="flex-auto">
                <FuseSvgIcon size={20} color="action">
                  feather:twitter
                </FuseSvgIcon>
              </Button>
              <Button variant="outlined" className="flex-auto">
                <FuseSvgIcon size={20} color="action">
                  feather:github
                </FuseSvgIcon>
              </Button>
            </div> */}
					</form>
				</div>
			</Paper>

			<Box
				className="relative hidden md:flex flex-auto items-center justify-center h-full p-64 lg:px-112 overflow-hidden"
				sx={{ backgroundColor: "primary.main" }}
			>
				<svg
					className="absolute inset-0 pointer-events-none"
					viewBox="0 0 960 540"
					width="100%"
					height="100%"
					preserveAspectRatio="xMidYMax slice"
					xmlns="http://www.w3.org/2000/svg"
				>
					<svg
						className="absolute opacity-20 MuiBox-root muiltr-x3mbcd"
						width="820"
						height="900"
						viewBox="0 0 620 900"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<circle
							cx="541.5"
							cy="717.5"
							r="467.5"
							fill="url(#paint0_linear_0_1)"
							fillOpacity="0.03"
						></circle>
						<circle
							cx="333.5"
							cy="533.5"
							r="467.5"
							fill="url(#paint1_linear_0_1)"
							fillOpacity="0.02"
						></circle>
						<circle
							cx="296"
							cy="472"
							r="545"
							fill="url(#paint2_linear_0_1)"
							fillOpacity="0.03"
						></circle>
						<circle
							cx="632"
							cy="784"
							r="350"
							fill="url(#paint3_linear_0_1)"
							fillOpacity="0.01"
						></circle>
						<rect
							x="167.495"
							y="296.004"
							width="82.8842"
							height="82.8842"
							rx="18"
							fill="url(#paint4_linear_0_1)"
							fillOpacity="0.4"
						></rect>
						<g clipPath="url(#clip0_0_1)">
							<path
								d="M226.74 328.682C226.167 328.483 225.573 328.294 224.962 328.116C225.062 327.702 225.154 327.292 225.236 326.89C226.583 320.285 225.703 314.964 222.696 313.213C219.814 311.533 215.1 313.284 210.338 317.471C209.88 317.874 209.421 318.3 208.962 318.747C208.657 318.451 208.351 318.166 208.047 317.893C203.057 313.415 198.055 311.529 195.052 313.286C192.172 314.97 191.319 319.972 192.532 326.232C192.649 326.836 192.785 327.454 192.94 328.082C192.232 328.285 191.549 328.501 190.895 328.731C185.045 330.792 181.309 334.023 181.309 337.373C181.309 340.834 185.32 344.305 191.413 346.409C191.894 346.575 192.393 346.732 192.907 346.881C192.74 347.56 192.595 348.226 192.473 348.875C191.317 355.025 192.22 359.909 195.092 361.583C198.059 363.312 203.038 361.535 207.886 357.253C208.269 356.914 208.654 356.555 209.039 356.179C209.538 356.665 210.037 357.125 210.533 357.556C215.229 361.64 219.867 363.289 222.736 361.61C225.7 359.876 226.663 354.63 225.413 348.246C225.317 347.759 225.206 347.261 225.081 346.754C225.431 346.649 225.774 346.542 226.109 346.429C232.443 344.309 236.565 340.88 236.565 337.373C236.565 334.011 232.708 330.759 226.74 328.682ZM225.367 344.165C225.064 344.266 224.754 344.364 224.438 344.459C223.739 342.222 222.795 339.843 221.64 337.385C222.742 334.986 223.65 332.637 224.33 330.414C224.895 330.58 225.443 330.754 225.972 330.938C231.085 332.717 234.204 335.347 234.204 337.373C234.204 339.532 230.836 342.334 225.367 344.165ZM223.097 348.71C223.65 351.532 223.729 354.084 223.363 356.079C223.034 357.872 222.372 359.067 221.553 359.546C219.812 360.564 216.088 359.24 212.072 355.748C211.612 355.347 211.148 354.92 210.683 354.467C212.24 352.747 213.796 350.746 215.314 348.525C217.986 348.285 220.509 347.893 222.798 347.359C222.911 347.818 223.011 348.269 223.097 348.71ZM200.147 359.37C198.446 359.977 197.09 359.994 196.271 359.517C194.528 358.501 193.804 354.58 194.792 349.319C194.905 348.717 195.04 348.098 195.195 347.466C197.459 347.972 199.964 348.335 202.642 348.555C204.171 350.729 205.772 352.727 207.385 354.477C207.033 354.821 206.682 355.148 206.332 355.457C204.189 357.35 202.04 358.694 200.147 359.37ZM192.176 344.152C189.482 343.221 187.257 342.012 185.732 340.692C184.361 339.506 183.669 338.329 183.669 337.373C183.669 335.34 186.669 332.747 191.672 330.984C192.279 330.77 192.915 330.568 193.574 330.379C194.265 332.652 195.172 335.028 196.267 337.431C195.158 339.87 194.238 342.284 193.54 344.584C193.07 344.447 192.615 344.303 192.176 344.152ZM194.848 325.774C193.81 320.411 194.499 316.365 196.235 315.35C198.083 314.269 202.171 315.811 206.479 319.676C206.755 319.923 207.031 320.182 207.309 320.45C205.703 322.192 204.117 324.175 202.601 326.336C200.003 326.579 197.515 326.97 195.228 327.494C195.084 326.909 194.957 326.335 194.848 325.774ZM218.683 331.721C218.136 330.767 217.575 329.835 217.003 328.929C218.766 329.154 220.455 329.453 222.041 329.819C221.565 331.361 220.971 332.974 220.273 334.627C219.771 333.665 219.241 332.696 218.683 331.721ZM208.963 322.154C210.052 323.346 211.142 324.677 212.215 326.121C211.134 326.07 210.04 326.043 208.937 326.043C207.844 326.043 206.758 326.069 205.684 326.12C206.758 324.689 207.857 323.36 208.963 322.154ZM199.181 331.738C198.635 332.695 198.115 333.659 197.621 334.625C196.934 332.978 196.346 331.358 195.865 329.793C197.442 329.437 199.123 329.145 200.875 328.925C200.295 329.839 199.729 330.778 199.181 331.737V331.738ZM200.925 345.992C199.116 345.788 197.409 345.511 195.833 345.165C196.321 343.573 196.922 341.918 197.624 340.235C198.119 341.201 198.641 342.165 199.19 343.124H199.191C199.75 344.102 200.33 345.059 200.925 345.992ZM209.029 352.76C207.91 351.54 206.794 350.191 205.704 348.74C206.762 348.782 207.841 348.803 208.937 348.803C210.063 348.803 211.177 348.777 212.272 348.728C211.196 350.206 210.11 351.557 209.029 352.76ZM220.295 340.149C221.034 341.851 221.656 343.496 222.151 345.061C220.549 345.431 218.819 345.728 216.996 345.949C217.57 345.031 218.136 344.083 218.693 343.108C219.255 342.122 219.79 341.134 220.295 340.149ZM216.648 341.916C215.784 343.43 214.897 344.874 213.997 346.238C212.357 346.357 210.663 346.418 208.937 346.418C207.217 346.418 205.545 346.364 203.934 346.258C202.997 344.876 202.091 343.427 201.233 341.929H201.233C200.377 340.435 199.59 338.929 198.876 337.43C199.589 335.929 200.375 334.42 201.226 332.929L201.226 332.929C202.079 331.434 202.977 329.992 203.905 328.619C205.549 328.494 207.234 328.428 208.937 328.428H208.937C210.648 328.428 212.335 328.494 213.978 328.621C214.891 329.984 215.783 331.421 216.64 332.916C217.506 334.429 218.302 335.927 219.022 337.397C218.305 338.891 217.51 340.405 216.648 341.916ZM221.517 315.279C223.368 316.357 224.087 320.706 222.925 326.409C222.85 326.773 222.767 327.143 222.676 327.519C220.384 326.984 217.894 326.586 215.288 326.339C213.77 324.154 212.196 322.168 210.617 320.448C211.042 320.036 211.466 319.642 211.888 319.271C215.967 315.683 219.78 314.267 221.517 315.279ZM208.937 332.387C211.662 332.387 213.871 334.619 213.871 337.373C213.871 340.127 211.662 342.359 208.937 342.359C206.212 342.359 204.003 340.127 204.003 337.373C204.003 334.619 206.212 332.387 208.937 332.387Z"
								fill="white"
							></path>
						</g>
						<rect
							x="250.379"
							y="410.972"
							width="65.0596"
							height="65.0596"
							rx="18"
							fill="url(#paint5_linear_0_1)"
							fillOpacity="0.4"
						></rect>
						<g clipPath="url(#clip1_0_1)">
							<path
								d="M295.119 426.123H302.961L283.354 460.849L263.747 426.123H271.492H278.747L283.354 434.175L287.864 426.123H295.119Z"
								fill="white"
							></path>
							<path
								d="M263.747 426.123L283.354 460.849L302.961 426.123H295.119L283.354 446.959L271.492 426.123H263.747Z"
								fill="white"
							></path>
							<path
								d="M271.492 426.123L283.354 447.059L295.119 426.123H287.864L283.354 434.175L278.747 426.123H271.492Z"
								fill="#35495E"
								fillOpacity="0.2"
							></path>
						</g>
						<rect
							x="106"
							y="410.972"
							width="49.9088"
							height="49.9088"
							rx="18"
							fill="url(#paint6_linear_0_1)"
							fillOpacity="0.4"
						></rect>
						<g clipPath="url(#clip2_0_1)">
							<path
								d="M142.618 424.898C139.635 420.757 133.742 419.53 129.481 422.162L121.998 426.787C119.954 428.034 118.546 430.058 118.12 432.363C117.763 434.283 118.077 436.263 119.011 437.991C118.371 438.933 117.934 439.992 117.727 441.102C117.297 443.451 117.86 445.87 119.29 447.811C122.274 451.953 128.167 453.18 132.427 450.547L139.91 445.923C141.954 444.676 143.362 442.652 143.789 440.347C144.146 438.427 143.832 436.446 142.898 434.718C143.538 433.776 143.975 432.718 144.181 431.607C144.612 429.258 144.049 426.839 142.619 424.898"
								fill="white"
								fillOpacity="0.4"
							></path>
							<path
								d="M128.75 448.205C126.337 448.813 123.789 447.898 122.368 445.911C121.507 444.744 121.169 443.289 121.428 441.876C121.471 441.646 121.531 441.419 121.606 441.198L121.747 440.781L122.131 441.054C123.017 441.685 124.007 442.165 125.059 442.473L125.337 442.555L125.312 442.824C125.278 443.207 125.385 443.589 125.613 443.903C126.041 444.501 126.808 444.777 127.535 444.595C127.698 444.552 127.853 444.486 127.995 444.399L135.48 439.773C135.85 439.547 136.106 439.18 136.183 438.763C136.261 438.337 136.159 437.898 135.9 437.546C135.472 436.948 134.705 436.672 133.978 436.854C133.815 436.896 133.66 436.962 133.519 437.05L130.662 438.816C130.193 439.105 129.68 439.324 129.142 439.463C126.73 440.071 124.182 439.155 122.761 437.169C121.9 436.001 121.561 434.547 121.82 433.133C122.077 431.747 122.924 430.53 124.154 429.78L131.638 425.154C132.108 424.864 132.621 424.645 133.159 424.506C135.572 423.898 138.12 424.813 139.541 426.8C140.401 427.967 140.74 429.422 140.481 430.835C140.437 431.065 140.378 431.291 140.302 431.513L140.161 431.93L139.778 431.657C138.892 431.026 137.902 430.546 136.85 430.238L136.571 430.156L136.597 429.887C136.631 429.504 136.524 429.122 136.295 428.808C135.868 428.209 135.1 427.933 134.374 428.116C134.211 428.158 134.056 428.224 133.914 428.312L126.429 432.938C126.058 433.164 125.803 433.531 125.726 433.948C125.648 434.374 125.75 434.812 126.009 435.165C126.437 435.763 127.204 436.039 127.931 435.857C128.094 435.814 128.249 435.748 128.391 435.661L131.247 433.896C131.716 433.606 132.229 433.387 132.766 433.248C135.179 432.64 137.727 433.555 139.148 435.542C140.008 436.709 140.347 438.164 140.088 439.577C139.832 440.964 138.985 442.181 137.755 442.932L130.27 447.557C129.8 447.847 129.288 448.066 128.749 448.205"
								fill="white"
							></path>
						</g>
						<rect
							x="121.151"
							y="201.533"
							width="62.386"
							height="62.386"
							rx="18"
							fill="url(#paint7_linear_0_1)"
							fillOpacity="0.4"
						></rect>
						<path
							d="M146.941 251.439C144.759 250.493 142.718 248.086 142.713 245.623C142.707 242.938 144.402 240.658 146.509 239.16C146.256 240.121 146.118 241 146.745 241.86C147.329 242.659 148.351 243.048 149.316 242.837C151.571 242.342 151.674 239.852 150.338 238.402C149.016 236.966 147.737 235.343 148.24 233.261C148.492 232.217 149.131 231.239 149.939 230.54C149.318 232.18 151.084 233.798 152.248 234.604C154.267 236.002 156.482 237.058 158.339 238.697C160.291 240.42 161.733 242.749 161.442 245.45C161.126 248.378 158.81 250.414 156.211 251.442C161.702 250.225 167.377 245.945 167.493 239.829C167.589 234.798 164.152 230.926 159.894 228.709L159.672 228.587C159.789 228.872 159.827 229.114 159.822 229.331C159.861 229.171 159.886 229.007 159.894 228.837C159.892 229.048 159.865 229.247 159.816 229.434L159.822 229.331C159.758 229.602 159.651 229.855 159.507 230.085L159.57 230.018C158.72 231.433 156.421 231.74 155.285 230.275C153.458 227.918 155.323 225.378 155.584 222.882C155.91 219.755 153.957 216.719 151.535 214.902C152.869 217.068 151.112 219.935 149.706 221.537C148.343 223.091 146.685 224.388 145.18 225.799C143.563 227.315 142.009 228.912 140.681 230.691C138.023 234.252 136.396 238.731 137.592 243.174C138.787 247.614 142.616 250.44 146.941 251.439Z"
							fill="white"
						></path>
						<g filter="url(#filter0_f_0_1)">
							<rect
								x="26"
								y="272"
								width="48"
								height="48"
								rx="18"
								fill="url(#paint8_linear_0_1)"
								fillOpacity="0.4"
							></rect>
						</g>
						<rect
							x="655"
							y="187"
							width="65"
							height="65"
							rx="18"
							fill="url(#paint9_linear_0_1)"
							fillOpacity="0.4"
						></rect>
						<g filter="url(#filter1_f_0_1)">
							<rect
								x="631"
								y="388"
								width="46"
								height="46"
								rx="18"
								fill="url(#paint10_linear_0_1)"
								fillOpacity="0.4"
							></rect>
						</g>
						<g filter="url(#filter2_f_0_1)">
							<rect
								x="706"
								y="460"
								width="37"
								height="37"
								rx="18"
								fill="url(#paint11_linear_0_1)"
								fillOpacity="0.4"
							></rect>
						</g>
						<g filter="url(#filter3_f_0_1)">
							<rect
								x="486"
								y="180"
								width="28"
								height="28"
								rx="14"
								fill="url(#paint12_linear_0_1)"
								fillOpacity="0.4"
							></rect>
						</g>
						<g filter="url(#filter4_f_0_1)">
							<rect
								x="681"
								y="309"
								width="22"
								height="22"
								rx="11"
								fill="url(#paint13_linear_0_1)"
								fillOpacity="0.4"
							></rect>
						</g>
						<g filter="url(#filter5_f_0_1)">
							<rect
								x="-12"
								y="388"
								width="46"
								height="46"
								rx="18"
								fill="url(#paint14_linear_0_1)"
								fillOpacity="0.4"
							></rect>
						</g>
						<rect
							x="521.312"
							y="420.775"
							width="49.0175"
							height="49.0175"
							rx="18"
							fill="url(#paint15_linear_0_1)"
							fillOpacity="0.4"
						></rect>
						<path
							d="M546.267 454.481V459.989C555.604 459.989 562.874 450.969 559.819 441.185C558.484 436.909 555.087 433.512 550.811 432.177C541.027 429.123 532.007 436.393 532.007 445.73H537.528C537.529 445.73 537.53 445.729 537.53 445.729C537.531 439.869 543.33 435.339 549.49 437.574C551.772 438.402 553.593 440.223 554.422 442.505C556.657 448.662 552.134 454.458 546.279 454.467V448.976C546.279 448.976 546.279 448.975 546.278 448.975H540.774C540.774 448.975 540.773 448.976 540.773 448.976V454.481H546.267ZM540.772 458.712H536.543L536.542 458.711V454.481H540.773V458.711C540.773 458.711 540.773 458.712 540.772 458.712ZM536.545 454.481H532.999C532.998 454.481 532.997 454.48 532.997 454.48V450.936C532.997 450.936 532.998 450.933 532.999 450.933H536.542C536.544 450.933 536.545 450.935 536.545 450.935V454.481Z"
							fill="white"
						></path>
						<rect
							x="307.418"
							y="197.968"
							width="122.098"
							height="122.098"
							rx="18"
							fill="url(#paint16_linear_0_1)"
							fillOpacity="0.4"
						></rect>
						<g clipPath="url(#clip3_0_1)">
							<path
								d="M368.912 298.53C367.833 298.53 366.825 298.239 365.89 297.73L356.319 291.984C354.88 291.184 355.599 290.893 356.031 290.747C357.974 290.093 358.334 289.947 360.349 288.784C360.565 288.638 360.852 288.711 361.068 288.856L368.409 293.293C368.696 293.439 369.056 293.439 369.272 293.293L397.985 276.491C398.273 276.346 398.417 276.055 398.417 275.691V242.16C398.417 241.797 398.273 241.506 397.985 241.36L369.272 224.631C368.984 224.486 368.624 224.486 368.409 224.631L339.696 241.36C339.408 241.506 339.264 241.869 339.264 242.16V275.691C339.264 275.982 339.408 276.346 339.696 276.491L347.539 281.074C351.785 283.256 354.448 280.71 354.448 278.164V245.07C354.448 244.633 354.808 244.197 355.311 244.197H358.981C359.413 244.197 359.845 244.561 359.845 245.07V278.164C359.845 283.91 356.751 287.256 351.353 287.256C349.698 287.256 348.403 287.256 344.733 285.438L337.177 281.074C335.306 279.983 334.154 277.946 334.154 275.764V242.233C334.154 240.051 335.306 238.014 337.177 236.923L365.89 220.122C367.689 219.103 370.136 219.103 371.935 220.122L400.648 236.923C402.519 238.014 403.67 240.051 403.67 242.233V275.764C403.67 277.946 402.519 279.983 400.648 281.074L371.935 297.875C370.999 298.312 369.92 298.53 368.912 298.53ZM377.764 275.473C365.17 275.473 362.58 269.654 362.58 264.708C362.58 264.272 362.939 263.835 363.443 263.835H367.185C367.617 263.835 367.977 264.126 367.977 264.563C368.552 268.418 370.208 270.309 377.836 270.309C383.88 270.309 386.471 268.927 386.471 265.654C386.471 263.763 385.752 262.381 376.324 261.435C368.481 260.635 363.587 258.889 363.587 252.561C363.587 246.67 368.481 243.179 376.684 243.179C385.895 243.179 390.429 246.379 391.005 253.362C391.005 253.58 390.933 253.798 390.789 254.016C390.645 254.162 390.429 254.307 390.213 254.307H386.471C386.111 254.307 385.752 254.016 385.68 253.652C384.816 249.652 382.585 248.343 376.684 248.343C370.064 248.343 369.272 250.67 369.272 252.416C369.272 254.525 370.208 255.18 379.131 256.344C387.982 257.507 392.156 259.18 392.156 265.436C392.084 271.836 386.903 275.473 377.764 275.473Z"
								fill="white"
							></path>
						</g>
						<rect
							x="368.912"
							y="352.151"
							width="91.7965"
							height="91.7965"
							rx="18"
							fill="url(#paint17_linear_0_1)"
							fillOpacity="0.4"
						></rect>
						<g clipPath="url(#clip4_0_1)">
							<path
								d="M440.182 383.432C440.201 383.5 440.211 383.571 440.211 383.643V394.719C440.211 395.008 440.056 395.275 439.806 395.419L430.55 400.771V411.38C430.55 411.669 430.397 411.935 430.148 412.081L410.827 423.252C410.782 423.277 410.734 423.293 410.686 423.31C410.668 423.316 410.651 423.327 410.632 423.332C410.496 423.368 410.354 423.368 410.219 423.332C410.197 423.326 410.177 423.314 410.156 423.306C410.112 423.29 410.066 423.276 410.023 423.252L390.706 412.081C390.456 411.937 390.302 411.669 390.302 411.38V378.152C390.302 378.079 390.312 378.009 390.33 377.94C390.336 377.917 390.35 377.896 390.358 377.872C390.373 377.83 390.387 377.787 390.409 377.747C390.424 377.721 390.446 377.7 390.465 377.675C390.488 377.643 390.509 377.61 390.536 377.582C390.559 377.558 390.589 377.541 390.615 377.521C390.645 377.497 390.671 377.471 390.704 377.451H390.705L400.364 371.866C400.613 371.722 400.919 371.722 401.168 371.866L410.828 377.451H410.83C410.862 377.472 410.889 377.497 410.918 377.52C410.944 377.54 410.973 377.558 410.996 377.581C411.025 377.61 411.045 377.643 411.069 377.675C411.086 377.7 411.109 377.721 411.123 377.747C411.146 377.788 411.159 377.83 411.175 377.872C411.183 377.896 411.197 377.917 411.203 377.941C411.222 378.01 411.231 378.081 411.232 378.152V398.906L419.281 394.251V383.642C419.281 383.571 419.291 383.499 419.309 383.432C419.316 383.407 419.329 383.386 419.337 383.363C419.353 383.321 419.367 383.277 419.389 383.238C419.404 383.211 419.426 383.19 419.444 383.166C419.468 383.134 419.488 383.1 419.516 383.072C419.539 383.049 419.568 383.032 419.594 383.012C419.624 382.987 419.651 382.961 419.683 382.942H419.684L429.344 377.356C429.593 377.212 429.899 377.212 430.148 377.356L439.807 382.942C439.842 382.962 439.868 382.987 439.898 383.011C439.923 383.031 439.952 383.049 439.975 383.071C440.003 383.1 440.024 383.134 440.048 383.166C440.066 383.19 440.088 383.211 440.102 383.238C440.125 383.277 440.138 383.321 440.154 383.363C440.163 383.386 440.176 383.407 440.182 383.432ZM438.6 394.251V385.041L435.22 386.995L430.55 389.695V398.906L438.601 394.251H438.6ZM428.941 410.913V401.696L424.348 404.331L411.231 411.849V421.153L428.941 410.913ZM391.912 379.55V410.913L409.62 421.152V411.85L400.369 406.592L400.366 406.59L400.362 406.588C400.331 406.57 400.305 406.544 400.276 406.521C400.251 406.501 400.221 406.485 400.199 406.463L400.197 406.46C400.171 406.435 400.153 406.403 400.131 406.375C400.111 406.348 400.087 406.325 400.071 406.296L400.07 406.293C400.052 406.263 400.04 406.227 400.027 406.192C400.014 406.162 399.997 406.134 399.989 406.101V406.1C399.979 406.062 399.977 406.022 399.973 405.982C399.969 405.952 399.961 405.922 399.961 405.892V405.889V384.205L395.292 381.503L391.912 379.551V379.55ZM400.767 373.499L392.719 378.152L400.765 382.805L408.812 378.151L400.765 373.499H400.767ZM404.953 402.536L409.621 399.837V379.55L406.241 381.504L401.571 384.205V404.491L404.953 402.536ZM429.746 378.99L421.699 383.643L429.746 388.295L437.792 383.642L429.746 378.99ZM428.941 389.695L424.271 386.995L420.891 385.041V394.251L425.56 396.951L428.941 398.906V389.695ZM410.424 410.451L422.228 403.684L428.128 400.302L420.087 395.652L410.829 401.006L402.39 405.884L410.424 410.451Z"
								fill="white"
							></path>
						</g>
						<rect
							x="499.923"
							y="259.463"
							width="114.077"
							height="114.077"
							rx="18"
							fill="url(#paint18_linear_0_1)"
							fillOpacity="0.4"
						></rect>
						<g clipPath="url(#clip5_0_1)">
							<path
								d="M556.961 295.112C547.455 295.112 541.513 299.853 539.137 309.335C542.702 304.594 546.861 302.816 551.614 304.001C554.326 304.678 556.264 306.64 558.41 308.812C561.905 312.351 565.95 316.446 574.786 316.446C584.292 316.446 590.234 311.705 592.611 302.224C589.046 306.964 584.887 308.742 580.133 307.557C577.421 306.881 575.483 304.919 573.337 302.746C569.842 299.208 565.797 295.112 556.961 295.112ZM539.137 316.446C529.63 316.446 523.689 321.187 521.312 330.669C524.877 325.928 529.036 324.15 533.789 325.335C536.501 326.012 538.44 327.974 540.585 330.146C544.081 333.685 548.126 337.78 556.961 337.78C566.468 337.78 572.409 333.039 574.786 323.557C571.221 328.298 567.062 330.076 562.309 328.891C559.597 328.215 557.658 326.252 555.513 324.08C552.018 320.542 547.972 316.446 539.137 316.446Z"
								fill="url(#paint19_linear_0_1)"
							></path>
						</g>
						<defs>
							<filter
								id="filter0_f_0_1"
								x="18"
								y="264"
								width="64"
								height="64"
								filterUnits="userSpaceOnUse"
								colorInterpolationFilters="sRGB"
							>
								<feFlood
									floodOpacity="0"
									result="BackgroundImageFix"
								></feFlood>
								<feBlend
									mode="normal"
									in="SourceGraphic"
									in2="BackgroundImageFix"
									result="shape"
								></feBlend>
								<feGaussianBlur
									stdDeviation="4"
									result="effect1_foregroundBlur_0_1"
								></feGaussianBlur>
							</filter>
							<filter
								id="filter1_f_0_1"
								x="623"
								y="380"
								width="62"
								height="62"
								filterUnits="userSpaceOnUse"
								colorInterpolationFilters="sRGB"
							>
								<feFlood
									floodOpacity="0"
									result="BackgroundImageFix"
								></feFlood>
								<feBlend
									mode="normal"
									in="SourceGraphic"
									in2="BackgroundImageFix"
									result="shape"
								></feBlend>
								<feGaussianBlur
									stdDeviation="4"
									result="effect1_foregroundBlur_0_1"
								></feGaussianBlur>
							</filter>
							<filter
								id="filter2_f_0_1"
								x="698"
								y="452"
								width="53"
								height="53"
								filterUnits="userSpaceOnUse"
								colorInterpolationFilters="sRGB"
							>
								<feFlood
									floodOpacity="0"
									result="BackgroundImageFix"
								></feFlood>
								<feBlend
									mode="normal"
									in="SourceGraphic"
									in2="BackgroundImageFix"
									result="shape"
								></feBlend>
								<feGaussianBlur
									stdDeviation="4"
									result="effect1_foregroundBlur_0_1"
								></feGaussianBlur>
							</filter>
							<filter
								id="filter3_f_0_1"
								x="478"
								y="172"
								width="44"
								height="44"
								filterUnits="userSpaceOnUse"
								colorInterpolationFilters="sRGB"
							>
								<feFlood
									floodOpacity="0"
									result="BackgroundImageFix"
								></feFlood>
								<feBlend
									mode="normal"
									in="SourceGraphic"
									in2="BackgroundImageFix"
									result="shape"
								></feBlend>
								<feGaussianBlur
									stdDeviation="4"
									result="effect1_foregroundBlur_0_1"
								></feGaussianBlur>
							</filter>
							<filter
								id="filter4_f_0_1"
								x="673"
								y="301"
								width="38"
								height="38"
								filterUnits="userSpaceOnUse"
								colorInterpolationFilters="sRGB"
							>
								<feFlood
									floodOpacity="0"
									result="BackgroundImageFix"
								></feFlood>
								<feBlend
									mode="normal"
									in="SourceGraphic"
									in2="BackgroundImageFix"
									result="shape"
								></feBlend>
								<feGaussianBlur
									stdDeviation="4"
									result="effect1_foregroundBlur_0_1"
								></feGaussianBlur>
							</filter>
							<filter
								id="filter5_f_0_1"
								x="-20"
								y="380"
								width="62"
								height="62"
								filterUnits="userSpaceOnUse"
								colorInterpolationFilters="sRGB"
							>
								<feFlood
									floodOpacity="0"
									result="BackgroundImageFix"
								></feFlood>
								<feBlend
									mode="normal"
									in="SourceGraphic"
									in2="BackgroundImageFix"
									result="shape"
								></feBlend>
								<feGaussianBlur
									stdDeviation="4"
									result="effect1_foregroundBlur_0_1"
								></feGaussianBlur>
							</filter>
							<linearGradient
								id="paint0_linear_0_1"
								x1="160"
								y1="418"
								x2="293.5"
								y2="881"
								gradientUnits="userSpaceOnUse"
							>
								<stop
									stopColor="white"
									stopOpacity="0.4"
								></stop>
								<stop
									offset="1"
									stopColor="white"
									stopOpacity="0"
								></stop>
							</linearGradient>
							<linearGradient
								id="paint1_linear_0_1"
								x1="32.9643"
								y1="206.25"
								x2="426.332"
								y2="681.764"
								gradientUnits="userSpaceOnUse"
							>
								<stop stopColor="white"></stop>
								<stop
									offset="1"
									stopColor="white"
									stopOpacity="0"
								></stop>
							</linearGradient>
							<linearGradient
								id="paint2_linear_0_1"
								x1="-54.3571"
								y1="90.5"
								x2="404.221"
								y2="644.843"
								gradientUnits="userSpaceOnUse"
							>
								<stop stopColor="white"></stop>
								<stop
									offset="1"
									stopColor="white"
									stopOpacity="0"
								></stop>
							</linearGradient>
							<linearGradient
								id="paint3_linear_0_1"
								x1="407"
								y1="539"
								x2="701.5"
								y2="895"
								gradientUnits="userSpaceOnUse"
							>
								<stop stopColor="white"></stop>
								<stop
									offset="1"
									stopColor="white"
									stopOpacity="0"
								></stop>
							</linearGradient>
							<linearGradient
								id="paint4_linear_0_1"
								x1="208.937"
								y1="296.004"
								x2="208.937"
								y2="378.888"
								gradientUnits="userSpaceOnUse"
							>
								<stop stopColor="#4F46E5"></stop>
								<stop
									offset="1"
									stopColor="#4F46E5"
									stopOpacity="0"
								></stop>
							</linearGradient>
							<linearGradient
								id="paint5_linear_0_1"
								x1="282.909"
								y1="410.972"
								x2="282.909"
								y2="476.032"
								gradientUnits="userSpaceOnUse"
							>
								<stop stopColor="#4F46E5"></stop>
								<stop
									offset="1"
									stopColor="#4F46E5"
									stopOpacity="0"
								></stop>
							</linearGradient>
							<linearGradient
								id="paint6_linear_0_1"
								x1="130.954"
								y1="410.972"
								x2="130.954"
								y2="460.881"
								gradientUnits="userSpaceOnUse"
							>
								<stop stopColor="#4F46E5"></stop>
								<stop
									offset="1"
									stopColor="#4F46E5"
									stopOpacity="0"
								></stop>
							</linearGradient>
							<linearGradient
								id="paint7_linear_0_1"
								x1="152.344"
								y1="201.533"
								x2="152.344"
								y2="263.919"
								gradientUnits="userSpaceOnUse"
							>
								<stop stopColor="#4F46E5"></stop>
								<stop
									offset="1"
									stopColor="#4F46E5"
									stopOpacity="0"
								></stop>
							</linearGradient>
							<linearGradient
								id="paint8_linear_0_1"
								x1="50"
								y1="272"
								x2="50"
								y2="320"
								gradientUnits="userSpaceOnUse"
							>
								<stop stopColor="#6B63EB"></stop>
								<stop
									offset="1"
									stopColor="#4F46E5"
									stopOpacity="0"
								></stop>
							</linearGradient>
							<linearGradient
								id="paint9_linear_0_1"
								x1="687.5"
								y1="187"
								x2="687.5"
								y2="252"
								gradientUnits="userSpaceOnUse"
							>
								<stop stopColor="#4F46E5"></stop>
								<stop
									offset="1"
									stopColor="#4F46E5"
									stopOpacity="0"
								></stop>
							</linearGradient>
							<linearGradient
								id="paint10_linear_0_1"
								x1="654"
								y1="388"
								x2="654"
								y2="434"
								gradientUnits="userSpaceOnUse"
							>
								<stop stopColor="#6B63EB"></stop>
								<stop
									offset="1"
									stopColor="#4F46E5"
									stopOpacity="0"
								></stop>
							</linearGradient>
							<linearGradient
								id="paint11_linear_0_1"
								x1="724.5"
								y1="460"
								x2="724.5"
								y2="497"
								gradientUnits="userSpaceOnUse"
							>
								<stop stopColor="#6B63EB"></stop>
								<stop
									offset="1"
									stopColor="#4F46E5"
									stopOpacity="0"
								></stop>
							</linearGradient>
							<linearGradient
								id="paint12_linear_0_1"
								x1="500"
								y1="180"
								x2="500"
								y2="208"
								gradientUnits="userSpaceOnUse"
							>
								<stop stopColor="#6B63EB"></stop>
								<stop
									offset="1"
									stopColor="#4F46E5"
									stopOpacity="0"
								></stop>
							</linearGradient>
							<linearGradient
								id="paint13_linear_0_1"
								x1="692"
								y1="309"
								x2="692"
								y2="331"
								gradientUnits="userSpaceOnUse"
							>
								<stop stopColor="#6B63EB"></stop>
								<stop
									offset="1"
									stopColor="#4F46E5"
									stopOpacity="0"
								></stop>
							</linearGradient>
							<linearGradient
								id="paint14_linear_0_1"
								x1="11"
								y1="388"
								x2="11"
								y2="434"
								gradientUnits="userSpaceOnUse"
							>
								<stop stopColor="#6B63EB"></stop>
								<stop
									offset="1"
									stopColor="#4F46E5"
									stopOpacity="0"
								></stop>
							</linearGradient>
							<linearGradient
								id="paint15_linear_0_1"
								x1="545.821"
								y1="420.775"
								x2="545.821"
								y2="469.793"
								gradientUnits="userSpaceOnUse"
							>
								<stop stopColor="#4F46E5"></stop>
								<stop
									offset="1"
									stopColor="#4F46E5"
									stopOpacity="0"
								></stop>
							</linearGradient>
							<linearGradient
								id="paint16_linear_0_1"
								x1="368.467"
								y1="197.968"
								x2="368.467"
								y2="320.067"
								gradientUnits="userSpaceOnUse"
							>
								<stop stopColor="#4F46E5"></stop>
								<stop
									offset="1"
									stopColor="#4F46E5"
									stopOpacity="0"
								></stop>
							</linearGradient>
							<linearGradient
								id="paint17_linear_0_1"
								x1="414.811"
								y1="352.151"
								x2="414.811"
								y2="443.947"
								gradientUnits="userSpaceOnUse"
							>
								<stop stopColor="#4F46E5"></stop>
								<stop
									offset="1"
									stopColor="#4F46E5"
									stopOpacity="0"
								></stop>
							</linearGradient>
							<linearGradient
								id="paint18_linear_0_1"
								x1="556.961"
								y1="259.463"
								x2="556.961"
								y2="373.54"
								gradientUnits="userSpaceOnUse"
							>
								<stop stopColor="#4F46E5"></stop>
								<stop
									offset="1"
									stopColor="#4F46E5"
									stopOpacity="0"
								></stop>
							</linearGradient>
							<linearGradient
								id="paint19_linear_0_1"
								x1="519.332"
								y1="308.766"
								x2="580.829"
								y2="344.316"
								gradientUnits="userSpaceOnUse"
							>
								<stop stopColor="white"></stop>
								<stop
									offset="1"
									stopColor="white"
									stopOpacity="0.5"
								></stop>
							</linearGradient>
							<clipPath id="clip0_0_1">
								<rect
									width="55.2561"
									height="49.7305"
									fill="white"
									transform="translate(181.309 312.58)"
								></rect>
							</clipPath>
							<clipPath id="clip1_0_1">
								<rect
									width="39.214"
									height="34.7579"
									fill="white"
									transform="translate(263.747 426.123)"
								></rect>
							</clipPath>
							<clipPath id="clip2_0_1">
								<rect
									width="26.7368"
									height="31.193"
									fill="white"
									transform="translate(117.586 420.775)"
								></rect>
							</clipPath>
							<clipPath id="clip3_0_1">
								<rect
									width="69.5158"
									height="79.3193"
									fill="white"
									transform="translate(334.154 219.358)"
								></rect>
							</clipPath>
							<clipPath id="clip4_0_1">
								<rect
									width="49.9088"
									height="51.6912"
									fill="white"
									transform="translate(390.302 371.758)"
								></rect>
							</clipPath>
							<clipPath id="clip5_0_1">
								<rect
									width="71.2982"
									height="42.7789"
									fill="white"
									transform="translate(521.312 295.112)"
								></rect>
							</clipPath>
						</defs>
					</svg>
				</svg>
				<Box
					component="svg"
					className="absolute -top-64 -right-64 opacity-20"
					sx={{ color: "primary.light" }}
					viewBox="0 0 220 192"
					width="220px"
					height="192px"
					fill="none"
				>
					<defs>
						<pattern
							id="837c3e70-6c3a-44e6-8854-cc48c737b659"
							x="0"
							y="0"
							width="20"
							height="20"
							patternUnits="userSpaceOnUse"
						>
							<rect
								x="0"
								y="0"
								width="4"
								height="4"
								fill="currentColor"
							/>
						</pattern>
					</defs>
					<rect
						width="220"
						height="192"
						fill="url(#837c3e70-6c3a-44e6-8854-cc48c737b659)"
					/>
				</Box>

				<div className="z-10 relative w-full max-w-2xl">
					<div className="text-7xl font-bold leading-none text-gray-100">
						<div>Unleash Your</div>
						<div>Productivity</div>
					</div>
					<div className="mt-24 text-lg tracking-tight leading-6 text-gray-400">
						Discover the power of seamless project management with
						our platform. Organize tasks, collaborate with teams,
						and achieve your goals efficiently.
					</div>
					<div className="flex items-center mt-32">
						<AvatarGroup
							sx={{
								"& .MuiAvatar-root": {
									borderColor: "primary.main",
								},
							}}
						>
							<Avatar src="assets/images/avatars/female-18.jpg" />
							<Avatar src="assets/images/avatars/female-11.jpg" />
							<Avatar src="assets/images/avatars/male-09.jpg" />
							<Avatar src="assets/images/avatars/male-16.jpg" />
						</AvatarGroup>

						<div className="ml-16 font-medium tracking-tight text-gray-400">
							Thousands of teams trust us. Dive in today.
						</div>
					</div>
				</div>
			</Box>
		</div>
	);
}

export default SignInPage;
