import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

interface PdfViewerProps {
  lessonTitle: string;
  lessonId: number;
}

const PdfViewer = ({ lessonTitle, lessonId }: PdfViewerProps) => {
  // PDF URL - trong thực tế sẽ lấy từ database theo lessonId
  const pdfUrl = '/pdf/lesson-demo.pdf';
  
  const handleDownload = () => {
    // Mở PDF trong tab mới để tải
    window.open(pdfUrl, '_blank');
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header với nút tải */}
      <div className="flex items-center justify-between p-4 bg-card border-b border-border">
        <div>
          <h2 className="font-semibold text-foreground">{lessonTitle}</h2>
          <p className="text-sm text-muted-foreground">Tài liệu PDF bài học</p>
        </div>
        <Button onClick={handleDownload}>
          <Download className="h-4 w-4 mr-2" />
          Tải tài liệu
        </Button>
      </div>

      {/* PDF Viewer - embed trực tiếp */}
      <div className="flex-1 bg-muted/30">
        <iframe
          src={pdfUrl}
          className="w-full h-full border-0"
          title={`PDF - ${lessonTitle}`}
        />
      </div>
    </div>
  );
};

export default PdfViewer;
