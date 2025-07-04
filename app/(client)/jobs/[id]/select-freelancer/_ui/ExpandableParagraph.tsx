import { useState, useRef, useEffect } from "react";
import { Typography, Button } from "antd";
import { motion, AnimatePresence } from "framer-motion";

const { Paragraph } = Typography;

export default function ExpandableParagraph({ content }: { content: string }) {
    const [expanded, setExpanded] = useState(false);
    const [showButton, setShowButton] = useState(false);
    const [collapsedHeight, setCollapsedHeight] = useState(0);
    const textRef = useRef<HTMLParagraphElement>(null);

    const [fullHeight, setFullHeight] = useState<number | null>(null);

    useEffect(() => {
        if (textRef.current) {
            const computed = getComputedStyle(textRef.current);
            const lineHeight = parseFloat(computed.lineHeight);
            const maxHeight = (lineHeight * 5) - 4; // 5 dòng
            setCollapsedHeight(maxHeight);

            // Reset height để đo toàn bộ
            textRef.current.style.maxHeight = "none";
            textRef.current.style.overflow = "visible";

            const scrollH = textRef.current.scrollHeight;

            if (scrollH > maxHeight + 1) {
                setShowButton(true);
            } else {
                setShowButton(false);
            }

            setFullHeight(scrollH);
        }
    }, [content]);

    return (
        <div>
            <motion.div
                initial={false}
                animate={{
                    height: expanded ? fullHeight || "auto" : collapsedHeight,
                }}
                style={{
                    overflow: "hidden",
                    width: "100%",
                    boxSizing: "border-box",
                }}
                transition={{
                    duration: 0.6,
                    ease: "easeInOut",
                }}
            >
                <Paragraph
                    ref={textRef}
                    style={{
                        color: "#4b5563",
                        backgroundColor: "#f8fafc",
                        padding: "16px 20px",
                        borderRadius: 12,
                        border: "1px solid #e2e8f0",
                        lineHeight: 1.7,
                        margin: 0,
                        fontStyle: "italic",
                        whiteSpace: "pre-wrap",
                        wordBreak: "break-word",
                        overflowWrap: "break-word",
                        width: "100%",
                        boxSizing: "border-box",
                    }}
                >
                    “{content}”
                </Paragraph>
            </motion.div>

            {showButton && (
                <Button
                    type="link"
                    onClick={() => setExpanded(!expanded)}
                    style={{ padding: 0 }}
                >
                    {expanded ? "Thu gọn" : "Xem thêm"}
                </Button>
            )}
        </div>
    );
}
