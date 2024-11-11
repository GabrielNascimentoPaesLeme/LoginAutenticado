import React from "react";
import { useEffect, useRef, useContext } from "react";
import Typed from "typed.js";
import "./Home.css";
import { ContextUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const typedRef2 = useRef(null);
  const typedRef1 = useRef(null);
  const user = JSON.parse(localStorage.getItem("user"));
  const username = Object.values(user);
  const { state } = useContext(ContextUser);
  const navigate = useNavigate();

  useEffect(() => {
    const options1 = {
      strings: ["meu portfólio de projetos!", "minhas redes sociais"],
      typeSpeed: 70,
      backSpeed: 25,
      backDelay: 1000,
      loop: true,
      cursorChar: "|",
      onComplete: (self) => {
        setTimeout(() => {
          self.start();
        }, 1000);
      },
    };

    const options2 = {
      strings: [
        `<code>console.log('Obrigado por testar a aplicação!');</code><br> Obrigado por testar a aplicação!`,
      ],
      typeSpeed: 50,
      backSpeed: 25,
      backDelay: 10000,
      loop: true,
      cursorChar: "|",
      onComplete: (self) => {
        // Espera 1 segundos após completar a digitação antes de reiniciar
        setTimeout(() => {
          self.start(); // Reinicia a digitação
        }, 10000);
      },
    };
    // Inicia o Typed.js
    const typed2 = new Typed(typedRef2.current, options2);
    const typed1 = new Typed(typedRef1.current, options1);

    // Limpeza do efeito ao desmontar o componente
    return () => {
      typed1.destroy();
      typed2.destroy();
    };
  }, []);

  /* useEffect(() => {
    if (state.isAuthenticated) {
      navigate("/home"); // ou qualquer rota desejada
    }else {
      navigate('/')
    }
  }, [state.isAuthenticated, navigate]); */

  return (
    <div id="title">
      <section className="bash-container">
        <div className="bash">
          <p>$Bash</p>
        </div>
        <h3 className="username">
          Olá,<span>{username[0]}</span>!
        </h3>
        <div className="code-content">
          <div>
            <h3 className="thanks">
              <p>
                <span ref={typedRef2}></span>{" "}
                <span
                  className="typed-cursor typed-cursor--blink"
                  aria-hidden="true"
                ></span>{" "}
              </p>
            </h3>
          </div>

          <div>
            <h3 className="visit">
              Visite <span ref={typedRef1}></span>{" "}
              <span
                className="typed-cursor typed-cursor--blink"
                aria-hidden="true"
              ></span>{" "}
            </h3>
            <div className="social">
              <div className="itens-social">Portfólio</div>
              <div className="itens-social">
                <a
                  href="https://www.linkedin.com/in/gabriel-do-nascimento-paes-leme-aa0794233/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="linkedin contact-icons"
                >
                  <i className="bi bi-linkedin"></i>
                  Linkedin
                </a>
              </div>
              <div className="itens-social">
                <a
                  href="https://github.com/GabrielNascimentoPaesLeme"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="github contact-icons"
                >
                  <i className="bi bi-github"></i>
                  GitHub
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
