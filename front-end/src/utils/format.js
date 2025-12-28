/**
 * Lấy chữ cái đầu từ tên người dùng
 */
export const getInitials = (name) => {
    if (!name) return "";
    const parts = name.trim().split(" ");
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();

    const firstChar = parts[0].charAt(0);
    const lastChar = parts[parts.length - 1].charAt(0);

    return (firstChar + lastChar).toUpperCase();
};

/**
 * Trả về màu sắc cố định dựa trên tên người dùng
 * Giúp avatar của cùng một người luôn có cùng một màu
 */
export const getAvatarColor = (name) => {
    const colors = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae', '#1890ff', '#eb2f96'];
    if (!name) return colors[0];

    let hash = 0;
    for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }

    const index = Math.abs(hash % colors.length);
    return colors[index];
};