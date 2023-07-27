const TheCart = ({ title, img, text, user }) => {
  return (
    <>
      <div
        style={{
          backgroundColor: '#D7CCC8',
          height: '180px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '30px',
          width: '820px',
        }}
      >
        <div
          style={{
            backgroundColor: '#fff',
            maxWidth: '800px',
            boxShadow: '2px 2px 5px #9E9E9E, -1px -1px 5px #9E9E9E',
            borderRadius: '3px',
            display: 'grid',
            gridTemplateColumn: 'repeat(5, 1fr)',
          }}
        >
          <div
            style={{
              width: '230px',
              height: '100%',
              gridColumn: '2',
              backgroundColor: '#fff',
              backgroundImage: `url(${img})`,
              backgroundSize: 'contain',
              backgroundPosition: 'center center',
              backgroundRepeat: 'no-repeat',
            }}
          ></div>
          <div
            style={{
              gridColumn: '3 / 5',
              padding: '10px 30px',
              borderLeft: '1px solid #ccc',
            }}
          >
            <h1
              style={{
                marginBottom: 0,
              }}
            >
              {title}
            </h1>
            <p class="excerpt">{text}</p>
            <p
              style={{
                borderTop: '1px solid #cdcdcd',
                fontWeight: 700,
                marginTop: '25px',
                padding: '25px 0 10px 0',
                color: '#555',
              }}
            >
              {' '}
              by {user}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default TheCart;
