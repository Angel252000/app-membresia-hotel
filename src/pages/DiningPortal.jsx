import { useMemo, useState } from 'react';
import { Clock3, ConciergeBell, MapPin, Star, UtensilsCrossed, Wine } from 'lucide-react';
import DiningCard from '../components/Dining/DiningCard';
import FoodItemCard from '../components/Dining/FoodItemCard';
import MenuCategoryTabs from '../components/Dining/MenuCategoryTabs';
import ReservationSummary from '../components/Dining/ReservationSummary';
import ReservationTimeSelector from '../components/Dining/ReservationTimeSelector';
import GuestSelector from '../components/Dining/GuestSelector';
import DietaryPreferencesModal from '../components/Dining/DietaryPreferencesModal';
import RoomServiceForm from '../components/Dining/RoomServiceForm';
import DiningReviewForm from '../components/Dining/DiningReviewForm';
import { diningRestaurants } from '../constants/diningData';
import { menuCategories, menuItems } from '../constants/menuData';
import { diningStats } from '../constants/diningConfig';
import { useDiningFilter } from '../hooks/useDiningFilter';
import { useDiningStats } from '../hooks/useDiningStats';
import { useDiningReservation } from '../hooks/useDiningReservation';
import { formatCurrency } from '../utils/priceHelpers';
import styles from '../styles/dining.module.css';

function DiningPortal() {
  const statIcons = {
    restaurants: <UtensilsCrossed size={18} />,
    menu: <Wine size={18} />,
    rating: <Star size={18} />,
    reviews: <Star size={18} />,
  };

  const [selectedCategory, setSelectedCategory] = useState(menuCategories[0].id);
  const [selectedRestaurantId, setSelectedRestaurantId] = useState(diningRestaurants[0]?.id ?? '');
  const [showDietaryModal, setShowDietaryModal] = useState(false);
  const [showRoomService, setShowRoomService] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [dietaryPreferences, setDietaryPreferences] = useState([]);
  const [reviewDraft, setReviewDraft] = useState({
    rating: 5,
    comment: '',
    favoriteDish: '',
    recommend: true,
  });

  const filteredItems = useDiningFilter(menuItems, selectedCategory, dietaryPreferences);
  const stats = useDiningStats(diningRestaurants, menuItems, diningStats);
  const {
    reservation,
    selectedItems,
    setReservationField,
    addItemToReservation,
    clearReservation,
    submitReservation,
    submitRoomService,
    submittedMessage,
  } = useDiningReservation({
    initialRestaurantId: selectedRestaurantId,
  });

  const featuredRestaurant = useMemo(
    () => diningRestaurants.find((restaurant) => restaurant.id === selectedRestaurantId) ?? diningRestaurants[0],
    [selectedRestaurantId],
  );

  const reservationTotal = useMemo(
    () => selectedItems.reduce((total, item) => total + item.price, 0),
    [selectedItems],
  );

  const availableItemsCount = filteredItems.filter((item) => item.available).length;

  return (
    <div className={styles.pageShell}>
      <section className={styles.heroSection}>
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>Portal Dining</p>
          <h1>Dining experiences crafted around every moment of your stay.</h1>
          <p className={styles.heroDescription}>
            Discover chef-led restaurants, curated menus, room service, and personalized requests in one premium
            hospitality flow.
          </p>
        </div>

        <div className={styles.statsGrid}>
          {stats.map((stat) => (
            <article key={stat.label} className={styles.statCard}>
              <div className={styles.statIconWrap}>{statIcons[stat.icon]}</div>
              <div>
                <p className={styles.statValue}>{stat.value}</p>
                <p className={styles.statLabel}>{stat.label}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.sectionBlock}>
        <div className={styles.sectionHeading}>
          <div>
            <p className={styles.sectionLabel}>Featured Restaurants</p>
            <h2>Reserve the table that matches tonight&apos;s mood.</h2>
          </div>
          <div className={styles.sectionMeta}>
            <span><MapPin size={16} /> Resort-wide dining access</span>
            <span><Clock3 size={16} /> Real-time availability indicators</span>
          </div>
        </div>

        <div className={styles.restaurantGrid}>
          {diningRestaurants.map((restaurant) => (
            <DiningCard
              key={restaurant.id}
              restaurant={restaurant}
              selected={restaurant.id === selectedRestaurantId}
              onSelect={() => {
                setSelectedRestaurantId(restaurant.id);
                setReservationField('restaurantId', restaurant.id);
              }}
            />
          ))}
        </div>
      </section>

      <section className={styles.sectionBlock}>
        <div className={styles.menuHeader}>
          <div>
            <p className={styles.sectionLabel}>Curated Menus</p>
            <h2>{featuredRestaurant.restaurantName}</h2>
            <p className={styles.menuSupportingText}>
              {availableItemsCount} items available now. Filter by category and dietary preference to build the ideal
              dining plan.
            </p>
          </div>

          <div className={styles.menuActions}>
            <button className={styles.secondaryButton} type="button" onClick={() => setShowDietaryModal(true)}>
              Dietary Preferences
            </button>
            <button className={styles.secondaryButton} type="button" onClick={() => setShowRoomService(true)}>
              <ConciergeBell size={16} />
              Room Service
            </button>
            <button className={styles.secondaryButton} type="button" onClick={() => setShowReviewForm(true)}>
              <Star size={16} />
              Leave Review
            </button>
          </div>
        </div>

        <MenuCategoryTabs
          categories={menuCategories}
          activeCategory={selectedCategory}
          itemCounts={menuItems}
          onChange={setSelectedCategory}
        />

        {filteredItems.length > 0 ? (
          <div className={styles.menuGrid}>
            {filteredItems.map((item) => (
              <FoodItemCard
                key={item.id}
                item={item}
                onAdd={() => addItemToReservation(item)}
              />
            ))}
          </div>
        ) : (
          <div className={styles.emptyState}>
            <UtensilsCrossed size={28} />
            <h3>No menu items match this filter</h3>
            <p>Try another category or clear dietary preferences to explore the full menu.</p>
          </div>
        )}
      </section>

      <section className={styles.sectionBlock}>
        <div className={styles.reservationLayout}>
          <div className={styles.reservationPanel}>
            <div className={styles.sectionHeading}>
              <div>
                <p className={styles.sectionLabel}>Reserve Table</p>
                <h2>Build a dining experience in a few guided steps.</h2>
              </div>
            </div>

            <div className={styles.formGrid}>
              <label className={styles.fieldBlock}>
                <span>Date</span>
                <input
                  className={styles.input}
                  type="date"
                  min={new Date().toISOString().split('T')[0]}
                  value={reservation.date}
                  onChange={(event) => setReservationField('date', event.target.value)}
                />
              </label>

              <ReservationTimeSelector
                value={reservation.time}
                onChange={(value) => setReservationField('time', value)}
              />

              <GuestSelector
                value={reservation.guests}
                onChange={(value) => setReservationField('guests', value)}
              />

              <label className={styles.fieldBlock}>
                <span>Special Requests</span>
                <textarea
                  className={styles.textarea}
                  rows={4}
                  placeholder="Celebration notes, seating preference, allergies, or chef requests."
                  value={reservation.specialRequests}
                  onChange={(event) => setReservationField('specialRequests', event.target.value)}
                />
              </label>
            </div>

            <div className={styles.quickHighlights}>
              <span><Wine size={16} /> Sommelier pairings available</span>
              <span><Clock3 size={16} /> Prep times shown before confirming</span>
            </div>
          </div>

          <ReservationSummary
            restaurant={featuredRestaurant}
            reservation={reservation}
            selectedItems={selectedItems}
            reservationTotal={formatCurrency(reservationTotal)}
            submittedMessage={submittedMessage}
            onClear={clearReservation}
            onReserve={submitReservation}
          />
        </div>
      </section>

      {showDietaryModal ? (
        <DietaryPreferencesModal
          selectedPreferences={dietaryPreferences}
          onClose={() => setShowDietaryModal(false)}
          onApply={(preferences) => {
            setDietaryPreferences(preferences);
            setShowDietaryModal(false);
          }}
        />
      ) : null}

      {showRoomService ? (
        <RoomServiceForm
          selectedItems={selectedItems}
          onClose={() => setShowRoomService(false)}
          onSubmit={(payload) => {
            submitRoomService(payload);
            setShowRoomService(false);
          }}
        />
      ) : null}

      {showReviewForm ? (
        <DiningReviewForm
          review={reviewDraft}
          onClose={() => setShowReviewForm(false)}
          onChange={setReviewDraft}
        />
      ) : null}
    </div>
  );
}

export default DiningPortal;
