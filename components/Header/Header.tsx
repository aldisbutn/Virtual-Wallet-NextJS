import Style from '@/components/Header/Header.module.css'

const Header = () => {
  return (
    <header className={Style.navWrapper}>
      <div className="logoWrapper">
        <h1>LOGO</h1>
      </div>
      <div>
        <input type="text" placeholder='Quick search...' />
      </div>
    </header>
  );
};

export default Header;
