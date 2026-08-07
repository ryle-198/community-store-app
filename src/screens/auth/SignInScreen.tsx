import { useState } from "react";
import ThemedTextInput from "../../components/ThemedTextInput";

const Login = () => {
  const [email, setEmail] = useState<string>(""); //array syntax. two values. First one is the state value. Second is a function that passes values into statevalue
  const [password, setPassword] = useState<string>("");
};

export default function SignInScreen() {
  //To Do: Add SafeArea-michigi or whatever its called to p
  return (
    <div>
      <h1>Community Store</h1>
      <h2>
        Your academic market place for shared <br />
        resources and community exchange.
      </h2>
      <div className="tabs">
        <div>LOGIN</div>
        <div>SIGN UP</div>
      </div>
      <form className="form">
        <label className="label">
          <h3>University Email</h3>
        </label>
        <ThemedTextInput
        // style={{width: '60%', marginBottom:20,}}
        // placeholder="studentnumber@mycput.ac.za"
        // keyBoardType="email-address" //so @ symbol shows at the bottom
        // // onChangeText={setEmail}
        // // value={email}
        />

        <label className="label">
          <h3>Password</h3>
        </label>
        <ThemedTextInput
        // style={{width: '60%', marginBottom:20,}}
        // placeholder="Password"
        // onChangeText={setPassword}
        // value={password}
        // secureTextEntry//hides users values thats typing in
        />
        <br />
        <input type="submit" value="LOGIN" />
      </form>

      <div>
        <h3>FORGOT PASSWORD?</h3>
      </div>

      <div>
        <h2>-- OR CONTINUE WITH --</h2>
      </div>

      <button>MICROSOFT</button>
    </div>
  );
}
