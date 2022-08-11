import { Link } from 'react-router-dom';
import { InView } from 'react-intersection-observer';
import '../css/WelcomePage.css';

const WelcomePage = () => {
  return (
    <>
      <div className="top--img-bk">
        <div className="top--bk-filter"></div>
        <p className="top--text-1 text-up">
          <span>N</span>
          <span>O</span>
          <span>&nbsp;</span>
          <span>C</span>
          <span>A</span>
          <span>T</span>
          <span>&nbsp;</span>
          <span>N</span>
          <span>O</span>
          <span>&nbsp;</span>
          <span>L</span>
          <span>I</span>
          <span>F</span>
          <span>E</span>
        </p>
        <div className="top--img-fr" style={{ zIndex: 1000 }}></div>
        <div className="top--text-slide" style={{ zIndex: 1100 }}>
          <div>
            <span className="font-light">Cat With </span>
            <span className="font-bold opacity-0">Cat With </span>
            <span className="font-light">Cat With </span>
            <span className="font-bold opacity-0">Cat With </span>
            <span className="font-light">Cat With </span>
            <span className="font-bold opacity-0">Cat With </span>
          </div>
          <div>
            <span className="font-light">Cat With </span>
            <span className="font-bold opacity-0">Cat With </span>
            <span className="font-light">Cat With </span>
            <span className="font-bold opacity-0">Cat With </span>
            <span className="font-light">Cat With </span>
            <span className="font-bold opacity-0">Cat With </span>
          </div>
        </div>
        <div className="top--text-slide" style={{ zIndex: 900 }}>
          <div>
            <span className="font-light">Cat With </span>
            <span className="font-bold">Cat With </span>
            <span className="font-light">Cat With </span>
            <span className="font-bold">Cat With </span>
            <span className="font-light">Cat With </span>
            <span className="font-bold">Cat With </span>
          </div>
          <div>
            <span className="font-light">Cat With </span>
            <span className="font-bold">Cat With </span>
            <span className="font-light">Cat With </span>
            <span className="font-bold">Cat With </span>
            <span className="font-light">Cat With </span>
            <span className="font-bold">Cat With </span>
          </div>
        </div>
      </div>
      <div className="flex-div">
        <div className="link-width">
          <div className="img-div-p-bgimg img-div-bgimg-1">
            <div className="img--div-p bg-r--op">
              <div className="c-img--div-p">
                <InView triggerOnce="true">
                  {({ inView, ref, entry }) => (
                    <div
                      ref={ref}
                      className={inView ? 'img--div div--img-1 zoom-img' : ''}
                    ></div>
                  )}
                </InView>
              </div>
            </div>
          </div>
        </div>
        <Link to={`/adopterusercreate`} className="link-style-clear link-width">
          <div className="p--div-text bg-r">
            <div className="div-text ">
              <InView triggerOnce="true">
                {({ inView, ref, entry }) => (
                  <div ref={ref} className={inView ? 'text-up' : ''}>
                    <span>A</span>
                    <span>d</span>
                    <span>o</span>
                    <span>p</span>
                    <span>t</span>
                    <span>e</span>
                    <span>r</span>
                  </div>
                )}
              </InView>
            </div>
          </div>
        </Link>
      </div>

      <div className="div-text--detail bg-r-dark">
        <InView triggerOnce="true">
          {({ inView, ref, entry }) => (
            <div
              ref={ref}
              className={inView ? 'div-text--letter text-fadein' : ''}
            >
              2020〜2021年の1年間で約2万頭の猫が殺処分されました
              <br />
              CATWITHではこのような猫を減らすため、猫の里親を探しています
              <br />
              あなたもかけがえのない家族をCATWITHで探してみませんか？
              <br />
              （猫の譲渡には審査があります）
            </div>
          )}
        </InView>
      </div>
      <div className="flex-div-r">
        <Link
          to={`/supporterusercreate`}
          className="link-style-clear link-width"
        >
          <div className="p--div-text bg-br">
            <div className="div-text">
              <InView triggerOnce="true">
                {({ inView, ref, entry }) => (
                  <div ref={ref} className={inView ? 'text-up' : ''}>
                    <span>S</span>
                    <span>u</span>
                    <span>p</span>
                    <span>p</span>
                    <span>o</span>
                    <span>r</span>
                    <span>t</span>
                    <span>e</span>
                    <span>r</span>
                  </div>
                )}
              </InView>
            </div>
          </div>
        </Link>
        <div className="link-width">
          <div className="img-div-p-bgimg img-div-bgimg-2">
            <div className="img--div-p bg-br--op">
              <div className="c-img--div-p">
                <InView triggerOnce="true">
                  {({ inView, ref, entry }) => (
                    <div
                      ref={ref}
                      className={inView ? 'img--div div--img-2 zoom-img' : ''}
                    ></div>
                  )}
                </InView>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="div-text--detail bg-br-dark">
        <InView triggerOnce="true">
          {({ inView, ref, entry }) => (
            <div
              ref={ref}
              className={inView ? 'div-text--letter text-fadein' : ''}
            >
              捨て猫や野良猫を保護したが飼育できない
              <br />
              飼い猫を手放さざるをえない…
              <br />
              様々な事情で譲渡先を探す方を、CATWITHではサポーターと呼んでいます
              <br />
              CATWITHで里親になってくれる人を募集してみませんか？
            </div>
          )}
        </InView>
      </div>
    </>
  );
};

export default WelcomePage;
