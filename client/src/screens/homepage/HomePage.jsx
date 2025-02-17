import FileUpload from '../../components/fileupload/FileUpload';

const HomePage = () => {
  const handleGetdata = () => {
    console.log('done');
  };
  return (
    <>
      <div className="div">
        <FileUpload />
      </div>
      {/* <h1 className="text-black underline">Homepage</h1> */}
      <button onClick={handleGetdata} className="rounded-3xl bg-amber-300 p-2 text-black">
        Getdata
      </button>
    </>
  );
};

export default HomePage;
