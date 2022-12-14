import { useState } from "react";
import { ref, child, get, set } from "firebase/database";
import { auth, database, googleProvider } from "../../firebase";
import { AiOutlineClose } from "react-icons/ai";
import { Formik } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import freeship from "../../assets/freeship.png";
import googlelogo from "../../assets/googlelogo.png";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { signInWithPopup } from "firebase/auth";

const LoginPage = () => {
  const [users, setUsers] = useState([])
  const user = useSelector((state) => state.UserReducer);
  const [loading, setLoading] = useState(false)
  const [loginErr, setLoginErr] = useState(false)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dbRef = ref(database);

  useEffect(() => {
    get(child(dbRef, `users`)).then((snapshot) => {
      if(snapshot.exists()) {
        setUsers(snapshot.val())
      }
    })
  }, [])

  const handleGoogleSignIn = (e) => {
    e.preventDefault()
    signInWithPopup(auth, googleProvider).then((data) => {
      set(child(dbRef, `users/${users.length}`), {
        email: data.user.email,
        password: "",
        userid: users.length,
        username: data.user.displayName
      })
      dispatch({
        type: "USER_SIGNUP",
        payload: {
          usersignupid: users.length,
          signupusername: data.user.displayName,
          signupemail: data.user.email,
          signuppassword: ""
        }
      })
      navigate('/')
      toast.success("Đăng nhập thành công!")
    }) 
  }
  return (
    <>
      {loading && <div className='overlay z-9999'><div className='absolute-center loading'></div></div>}
      <div className="overlay">
        <div
          className="h-[80vh] w-[96vw] mt-[18vh] mx-auto rounded-xl 
        bg-white shadow-2xl relative p-8 text-center md:w-full md:h-[100vh] md:mt-0 overflow-y-scroll scroll"
        >
          {/* <div className='absolute left-[50%] translate-x-[-50%] translate-y-[-60%]'>
            <img src={freeship} alt="freeship" />
          </div> */}
          <div className=" mx-auto md:w-[80%] lg:w-[60%] xl:w-[40%] 2xl:w-[30%]">
            <div className="text-right">
              <button
                className="p-2 rounded-lg bg-[#f6f6f6] shadow-2xl"
                onClick={() => navigate(-1)}
              >
                <AiOutlineClose size={16} />
              </button>
            </div>
            <div>
              <h1 className="h1 font-semibold text-[28px]">Đăng nhập</h1>
              <p className="mb-8 font-light">
                Chưa có tài khoản?{" "}
                <Link to={"/signup"} className="text-blue-600 font-normal">
                  Đăng ký tại đây
                </Link>
              </p>
            </div>
            <div className="">
              <button
                className="w-full flex items-center rounded-2xl 
                border border-solid border-[#ededed] p-3 hover:bg-slate-100" 
                onClick={handleGoogleSignIn}
              >
                <img src={googlelogo} width="32" alt="google" />
                <p className="text-gray-400 flex-1 text-center">
                  Đăng nhập bằng google
                </p>
              </button>
            </div>
            <div className="divider mt-4">
              <span className="uppercase text-[#8c98a4]">Hoặc</span>
            </div>
            <Formik
              initialValues={{ email: "", password: "", loginError: "" }}
              validationSchema={Yup.object({
                email: Yup.string()
                  .email("E-mail không hợp lệ.")
                  .required("E-mail là bắt buộc!"),
                password: Yup.string().required("Mật khẩu là bắt buộc!"),
              })}
              onSubmit={(values, { setSubmitting }) => {
                setLoading(true)
                setTimeout(() => {
                  users.map(item => {
                      if (values.email === item.email && values.password === item.password) {
                          dispatch({
                            type: "USER_LOGIN",
                            payload: {
                              userid: item.userid,
                              username: item.username,
                              email: values.email,
                              password: values.password,
                            },
                          });
                          navigate("/");
                          toast.success("Đăng nhập thành công!!")
                      } else {
                        setLoginErr(true)
                      }
                    })
                    setLoading(false)
                  }, 1800)
              }}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
              }) => (
                <form onSubmit={handleSubmit} className="w-full" id="evaluate-form">
                  <div className="w-full my-4">
                    <input
                      type="email"
                      name="email"
                      onChange={(e) => {
                        handleChange(e)
                        setLoginErr(false)
                      }}
                      onBlur={handleBlur}
                      className={`w-full py-3 px-4 rounded-2xl outline-[#fd802b] text-[14px] font-light 
                      border border-solid p-3 ${errors.email && touched.email && errors.email ? "border-red" : "border-[#ededed]"}`}
                      value={values.email}
                      placeholder="E-mail"
                    />
                    <p className="text-red-600 text-left font-light text-[14px]">
                      {errors.email && touched.email && errors.email}
                    </p>
                  </div>
                  <div className="w-full my-4">
                    <input
                      type="password"
                      name="password"
                      onChange={(e) => {
                        handleChange(e)
                        setLoginErr(false)
                      }}
                      onBlur={handleBlur}
                      className={`w-full py-3 px-4 rounded-2xl outline-[#fd802b] text-[14px] font-light 
                      border border-solid p-3 ${errors.password && touched.password && errors.password ? "border-red" : "border-[#ededed]"}`}
                      value={values.password}
                      placeholder="********"
                    />
                    <p className="text-red-600 text-left font-light text-[14px]">
                      {errors.password && touched.password && errors.password}
                    </p>
                    {loginErr && <p className="text-red-600 text-left font-light text-[14px]">
                      Email hoặc mật khẩu không chính xác
                    </p>}
                  </div>
                  <button
                    type="submit"
                    className="text-[14px] font-light my-2 p-4 rounded-2xl 
                    w-full bg-[#167674] text-white"
                  >
                    Đăng nhập
                  </button>
                </form>
              )}
            </Formik>
            <Link className="text-blue-600 text-[15px] mb-2">Quên mật khẩu?</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
