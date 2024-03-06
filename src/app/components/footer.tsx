
export function Footer({ title = "" }) {
    return (
        <footer>

            <a
                href="https://github.com/BilboSwaggins33/approxpi"
                target="_blank"
                rel="noreferrer"
            >
                <code>{title}</code>
            </a>
        </footer>
    );
}
