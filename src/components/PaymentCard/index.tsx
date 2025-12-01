import styles from "./index.module.scss";

const PaymentCard = () => {
  return (
    <div className={styles.paymentForm}>
      <h2 className={styles.title}>Оплата карткою</h2>
      <form method="POST" action="/pay">
        <div className={styles.formGroup}>
          <label htmlFor="card_number">Номер картки</label>
          <input
            type="text"
            id="card_number"
            name="card_number"
            maxLength={16}
            placeholder="1234 5678 9012 3456"
            required
          />
        </div>

        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label htmlFor="expiry">Термін дії</label>
            <input
              type="text"
              id="expiry"
              name="expiry"
              maxLength={5}
              placeholder="MM/YY"
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="cvv">CVV</label>
            <input
              type="password"
              id="cvv"
              name="cvv"
              maxLength={3}
              placeholder="•••"
              required
            />
          </div>
        </div>

        <button type="submit" className={styles.btnPay}>
          Оплатити
        </button>
      </form>
    </div>
  );
};

export default PaymentCard;
