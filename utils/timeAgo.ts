export default function timeAgo(date: Date): string {
    const now = new Date();
    const seconds = Math.round((now.getTime() - date.getTime()) / 1000);
    const minutes = Math.round(seconds / 60);
    const hours = Math.round(minutes / 60);
    const days = Math.round(hours / 24);

    if (seconds < 60) {
        return "just now";
    } else if (minutes < 60) {
        return `${minutes} min${minutes > 1 ? "s" : ""} ago`;
    } else if (hours < 24) {
        return `${hours} hr${hours > 1 ? "s" : ""} ago`;
    } else if (days < 7) {
        return `${days}d ago`;
    } else {
        // For dates beyond a week, you might want to return a more precise date
        // This can be adjusted as needed
        return date.toLocaleDateString();
    }
}
