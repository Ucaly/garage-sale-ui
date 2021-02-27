import React from "react";
import { Link } from "react-router-dom";
import SignUpButton from '../components/SignUpButton';

export default function SignUp() {
  return (
    <main>
        <section className="section about-section">
          <h2>You will be redirected to Auth0</h2>
          <SignUpButton />
          <Link to="/" className="btn btn-primary">
            back home
          </Link>
        </section>
    </main>
  );
}
