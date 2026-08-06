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
        <input
          type="text"
          id="email"
          name="email"
          placeholder="studentnumber@mycput.ac.za"
        />
        <label className="label">
          <h3>Password</h3>
        </label>
        <input type="text" id="password" name="password" placeholder="******" />
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
