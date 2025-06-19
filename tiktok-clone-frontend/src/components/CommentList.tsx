interface CommentListProps { postId: string; }
const CommentList: React.FC<CommentListProps> = ({ postId }) => <div>[Daftar Komentar untuk Post #{postId}]</div>;
export default CommentList;