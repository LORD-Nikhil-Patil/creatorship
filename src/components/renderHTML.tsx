interface ShowHtmlProps {
    htmlContent: string;
    className: string
}

export const ShowHtml: React.FC<ShowHtmlProps> = ({ htmlContent, className="" }) => {
    return (
        <p className={className} dangerouslySetInnerHTML={{ __html: htmlContent }} >
        </p>
    );
}