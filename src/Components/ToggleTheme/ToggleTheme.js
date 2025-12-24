import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../../Store/slices/themeSlice';
import styles from './ToggleTheme.module.css';
const ToggleTheme = () => {
    const theme = useSelector((s) => s.theme.theme);
    const dispatch = useDispatch();
    return (<div className={styles.toggleButton} onClick={() => dispatch(toggleTheme())}>
        {theme === 'dark' ? '☀︎' : '⏾'}
        {/* ☀︎
        💡
        ⏾ */}
    </div>
    );
};

export default ToggleTheme;