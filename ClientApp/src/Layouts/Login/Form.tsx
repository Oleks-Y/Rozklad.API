import React from "react";
import { Formik } from "formik";
import StudentAuthService from "../../services/studentAuthService";
import { Redirect } from "react-router-dom";

export interface LoginFormProps {}

export default class Form extends React.Component {
  state = { submitMessage: "", redirect: false };

  setRedirect = () => {
    this.setState({
      redirect: true,
    });
  };
  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to="/site" />;
    }
  };

  render() {
    return (
      <Formik
        initialValues={{ lastname: "", group: "" }}
        validate={(values) => {
          const erros: any = {};
          if (!values.lastname) erros.lastname = "Required";
          if (!values.group) erros.group = "Required";
          return erros;
        }}
        onSubmit={async (values: any, { setSubmitting }: any) => {
          console.log("in submit func");
          const service = new StudentAuthService();
          try {
            const id = await service.login(values);
            console.log("id", id);
          } catch (e) {
            this.setState({ submitMessage: "Невірні данні" });
            console.log(e);
            setSubmitting(false);
            return;
          }
          this.setRedirect();
        }}
      >
        {(props) => (
          <form className="user" onSubmit={props.handleSubmit}>
            {this.renderRedirect()}
            <div className="form-group">
              <input
                className="form-control form-control-user"
                type="lastname"
                id="lastname"
                placeholder="Введіть прізвище ..."
                name="lastname"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.lastname}
              />
              <p>
                {props.errors.lastname &&
                  props.touched.lastname &&
                  props.errors.lastname}
              </p>
            </div>
            <div className="form-group">
              <input
                className="form-control form-control-user"
                type="group"
                id="group"
                placeholder="Група"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.group}
              />
              <p>
                {props.errors.group &&
                  props.touched.group &&
                  props.errors.group}
              </p>
            </div>
            <div className="form-group">
              <div className="custom-control custom-checkbox small">
                <div className="form-check">
                  <input
                    className="form-check-input custom-control-input"
                    type="checkbox"
                    id="formCheck-1"
                  />
                  <label
                    className="form-check-label custom-control-label"
                    htmlFor="formCheck-1"
                  >
                    Remember Me
                  </label>
                </div>
              </div>
            </div>
            <button
              className="btn btn-primary btn-block text-white btn-user"
              type="submit"
              disabled={props.isSubmitting}
            >
              Login
            </button>
            <hr />
            <hr />
          </form>
        )}
      </Formik>
    );
  }
}
