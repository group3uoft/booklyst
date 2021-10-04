export default function imageUploadFunc() {
  if (this.files && this.files[0]) {
      var img = document.querySelector('img');
      img.onload = () => {
          URL.revokeObjectURL(img.src);  // no longer needed, free memory
      }

      img.src = URL.createObjectURL(this.files[0]); // set src to blob url
  }
};