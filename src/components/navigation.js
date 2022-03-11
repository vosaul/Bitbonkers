import React from "react"
import styled from "styled-components"
import Logo from "../images/privacypros-logo.svg"
import PhoneIcon from "../images/phone_logo.png"

const Nav = styled.section`
  background-color: #fff;
  font-size: 14px;
  font-family: sans-serif;
  padding: 24px 10px 10px;
  text-align: center;
  .nav-inner {
    margin: 0 auto;
    max-width: 1200px;
    display: flex;
    justify-content: space-between;
  }
  * {
  color: #000;
 }
  b {
    position: fixed;
    top: 10px;
    left: 0;
    right: 0;
    z-index: 100;
  }
`
const Auth = styled.div`
  width: fit-content;
  height: max-content;
  display: flex;
  align-items: center;
  gap: 30px;
  flex-wrap: wrap;
  .icon {
    width: 16px;
    height: 16px;
    margin: 0;
    }
`
const Phone = styled.div`
  display: flex;
  gap: 10px;
  align-content: center;
`
const Dealer = styled.div`
    width: fit-content;
    display: flex;
    gap: 10px;
    justify-content: center;
    align-items: center;
    padding: 5px;
    border: 1px solid #029090;
    border-radius: 3px;
  .text-container {
    display: grid;
    span {
      padding: 0;
      margin: 0;
    }
    .first-text {
      font-weight: 600;
      font-size: 14px;
      line-height: 1;
    }
    .second-text {
      font-size: 11px;
      line-height: 11px;
      letter-spacing: 0.9px;
    }
  }
`
const Navigation = () => {
  return (
    <Nav id="header" role="banner" className="nav-wrapper">
      <div id="header-inner" className="group nav-inner">

        <div id="logo" className="nav-logo">
          <a href="https://privacypros.io/">
            <img src={Logo} alt="logo" width="120" height="37" loading="lazy" />
          </a>
        </div>

        <Auth id="auth_retailer">
          <Phone>
            <img src={PhoneIcon} className="icon" alt="icon"></img>
            <span className="text">(281) 612-8484</span>
          </Phone>
          <Dealer>
            <img src={PhoneIcon} className="icon" alt="icon"></img>
            <div className="text-container">
              <span className="first-text">AUTHORIZED</span>
              <span className="second-text">WALLET DEALER</span>
            </div>
          </Dealer>
        </Auth>

       {/*  <a href="#nav" id="toggle-nav" className="toggle-nav" aria-label="Toggle Navigation">
          <div className="hamburger" id="hamburger-1">
            <span className="line"></span>
            <span className="line"></span>
            <span className="line"></span>
          </div>
        </a> */}
      </div>
      {/* 
<div id="mobile-nav" className="mobile-nav">

  <ul className="mobile-nav-main">
    <li className="first_li">
      <span>
        <a href="/products/the-billfodl/" className="toggle-mobile-nav-dropdown" data-sub-nav="explore">
          Shop Billfodl
        </a>
      </span>
      <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" viewBox="0 0 24 24" role="img" className="nav_icon carot" style="width: 16px; height: 16px;"><path d="m4.585 10.468 7.415 7.532 7.415-7.532c.779-.792.779-2.081 0-2.873s-2.049-.792-2.829 0l-4.586 4.659-4.587-4.659c-.378-.384-.88-.595-1.414-.595s-1.036.211-1.414.595c-.78.792-.78 2.082 0 2.873z"></path></svg>

      <div className="dropdown-content">
        <ul className="mobile-dropdown-nav">
          <li>
            <img src="/images/nav-menu/Billfodl_Mega_Menu_Image_1-350x.png" alt="Bilffodl" width="340" height="95" loading="lazy">
            <a href="/collections/billfodls/" className="collection-title underlined">
              Billfodls
            </a>

            <ul className="collection-content">
              <li>
                <a href="/products/the-billfodl/">The Billfodl</a>
              </li>
              <li>
                <a href="/products/multishard/">Multishard</a>
              </li>
              <li>
                <a href="/products/the-hodlers-bundle/">Hodler's Bundle</a>
              </li>
              <li>
                <a href="/products/cyber-security-bundle/">Cyber Security Bundle</a>
              </li>
            </ul>
          </li>
          <li>
            <img src="/images/nav-menu/FaradayBagsMegaMenuImage_2-350x.png" alt="Faraday Bags" width="340" height="95" loading="lazy" />
            <a href="/collections/faraday-bags/" className="collection-title underlined">
              Faraday Bags
            </a>

            <ul className="collection-content">
              <li>
                <a href="/products/faraday-bag-bundle/">Faraday Bag Bundle</a>
              </li>
              <li>
                <a href="/products/small-faraday-bag/">Small Faraday Bag</a>
              </li>
              <li>
                <a href="/products/large-faraday-bag/">Large Faraday Bag</a>
              </li>
              
              <li>
                <img src="/images/nav-menu/Bitcoin_Art_Mega_Menu_Image-350x.png" alt="Bitcoin White Paper Wall Art" width="340" height="95" loading="lazy" />
                <a href="/collections/bitcoin-art/" className="collection-title underlined">
                  Bitcoin Art
                </a>
                
                <ul className="collection-content">
                  <li>
                    <a href="/products/bitcoin-white-paper-wall-art/">White Paper</a>
                  </li>
                </ul>
              </li>
              -->
            </ul>

          </li>
          <li>
            <img src="/images/nav-menu/Wallet_Bundle_Mega_Menu_Image_3-350x.png" alt="Bilffodl" width="340" height="95" loading="lazy" />
            <a href="/collections/billfodl-wallet-bundles/" className="collection-title underlined">
              Hardware Wallets
            </a>

            <ul className="collection-content">
              <li>
                <a href="/trezor/buy-t/">Trezor Model T</a>
              </li>
              <li>
                <a href="/trezor/buy-one/">Trezor Model One</a>
              </li>
              <li>
                <a href="/ledger/buy-nano-x/">Ledger Nano X</a>
              </li>
              <li>
                <a href="/ledger/buy-nano-s/">Ledger Nano S</a>
              </li>
              <li>
                <a href="/blockstream/buy-jade/">Blockstream Jade</a>
              </li>
              <li>
                <a href="/products/foundation-passport-billfodl/">Foundation Passport</a>
              </li>
            </ul>

          </li>
        </ul>
      </div>
    </li>

    <li className="second_li">
      <span>
        <a href="/" className="toggle-mobile-nav-dropdown" data-sub-nav="explore">
          Wallet Reviews
        </a>
      </span>
      <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" viewBox="0 0 24 24" role="img" className="nav_icon carot" style="width: 16px; height: 16px;"><path d="m4.585 10.468 7.415 7.532 7.415-7.532c.779-.792.779-2.081 0-2.873s-2.049-.792-2.829 0l-4.586 4.659-4.587-4.659c-.378-.384-.88-.595-1.414-.595s-1.036.211-1.414.595c-.78.792-.78 2.082 0 2.873z"></path></svg>

      <div className="dropdown-content">
        <ul className="mobile-dropdown-nav">
          <li className="py-1">
            <a href="/trezor/one-review/">Trezor One Review</a>
          </li>
          <li className="py-1">
            <a href="/trezor/model-t-review/">Trezor Model T Review</a>
          </li>
          <li className="py-1">
            <a href="/ledger/nano-x-review/">Ledger Nano X Review</a>
          </li>
          <li className="py-1">
            <a href="/ledger/nano-s-review/">Ledger Nano S Review</a>
          </li>
          <li className="py-1">
            <a href="/keepkey/review/">KeepKey Review</a>
          </li>
          <li className="py-1">
            <a href="/bitbox/02-review/">BitBox02 Review</a>
          </li>
          <li className="py-1">
            <a href="/blockstream/jade-review/">Blockstream Jade Review</a>
          </li>
          <li className="py-1">
            <a href="/secux/v20-review/">SecuX V20 Review</a>
          </li>
        </ul>
      </div>
    </li>

    <li className=""><a href="/billfodl-faq/how-it-works/">How it works</a></li>
    <li className=""><a href="/about-us/">About</a></li>
    <li className=""><a href="/blog/">Blog</a></li>
    <li className=""><a href="/contact/">Contact</a></li>
  </ul>

  <a href="https://shop.privacypros.io/cart" title="Cart" className="cart-color">
    <span className="icon-set icon-set--cart_green"></span>
  </a>

</div> */}
    </Nav>
  )
}

export default Navigation
