import { db } from '../src/lib/db'

// Seed dữ liệu sản phẩm trang sức với trường "anti-marketing"
// Mỗi sản phẩm có: chiến lược marketing bị giải mã, lý do không nên mua,
// đánh giá trung thực, và sản phẩm thay thế từ thương hiệu/web khác.

type SeedProduct = {
  name: string
  category: string
  material: string
  price: number
  oldPrice?: number
  image: string
  images: string[]
  description: string
  carat?: number
  cutGrade?: string
  colorGrade?: string
  clarityGrade?: string
  origin?: string
  badge?: string
  marketingTactics: { tactic: string; decoded: string }[]
  whyNotToBuy: { reason: string; detail: string; severity: 'high' | 'medium' | 'low' }[]
  honestVerdict: string
  whenToBuy: string
  alternatives: { name: string; brand: string; url: string; priceRange: string; whyBetter: string }[]
  targetBudget: 'low' | 'mid' | 'high' | 'luxury'
}

const products: SeedProduct[] = [
  {
    name: 'Nhẫn Kim Cương Tự Nhiên 0.5 Carat',
    category: 'ring',
    material: 'Vàng 18K',
    price: 45000000,
    oldPrice: 58000000,
    image: '/products/diamond-ring-natural.jpg',
    images: ['/products/diamond-ring-natural.jpg'],
    description:
      'Nhẫn solitaire kim cương tự nhiên 0.5 carat, giác cắt láng, màu H, độ tinh khiết SI1, gắn trên vỏ vàng 18K. Thiết kế cổ điển thanh lịch.',
    carat: 0.5,
    cutGrade: 'Very Good',
    colorGrade: 'H',
    clarityGrade: 'SI1',
    origin: 'Tự nhiên',
    badge: 'Natural Diamond',
    marketingTactics: [
      {
        tactic: 'Gắn nhãn "Kim Cương Tự Nhiên" + "Natural Diamond"',
        decoded:
          'Tạo cảm giác khan hiếm và giá trị vượt trội so với lab-grown. Thực tế 0.5ct tự nhiên và lab-grown gần như giống hệt nhau khi soi bằng mắt thường, nhưng giá chênh lệch 3–4 lần.',
      },
      {
        tactic: 'Giá gạch 58tr → giảm còn 45tr',
        decoded:
          'Kỹ thuật "anchor pricing": tạo mức giá gốc ảo để khách hàng cảm thấy được hời 22tr. Mức 58tr hiếm khi được bán thực tế.',
      },
      {
        tactic: 'Câu chuyện "mỗi viên kim cương là duy nhất"',
        decoded:
          'Marketing cảm xúc để hợp thức hóa mức giá cao. Đúng là mỗi viên khác nhau về tạp chất, nhưng điều đó không đồng nghĩa với giá trị cao hơn.',
      },
    ],
    whyNotToBuy: [
      {
        reason: 'Markup cao gấp 2 lần giá trị thực',
        detail:
          'Kim cương 0.5ct (H, SI1, Very Good) có giá nhập khoảng 18–22 triệu. Giá bán 45tr tạo markup ~100%. Bạn trả nhiều cho thương hiệu hơn cho viên đá.',
        severity: 'high',
      },
      {
        reason: '0.5ct khá nhỏ, khó tạo ấn tượng',
        detail:
          'Đường kính viên 0.5ct chỉ ~5mm. Với cùng ngân sách, lab-grown cho phép bạn có viên 0.7–0.8ct lớn hơn rõ rệt.',
        severity: 'medium',
      },
      {
        reason: 'Vàng 18K dễ xước khi đeo hàng ngày',
        detail:
          'Vàng 18K (75%) mềm hơn bạch kim. Nếu đeo thường xuyên, vỏ nhẫn sẽ có vết xước và cần đánh bóng lại định kỳ.',
        severity: 'low',
      },
    ],
    honestVerdict:
      'Sản phẩm đẹp nhưng bạn đang trả nhiều cho "câu chuyện tự nhiên". Nếu mục tiêu là viên đá đẹp để đeo, có lựa chọn tốt hơn với cùng tiền.',
    whenToBuy:
      'Khi bạn thực sự trân trọng giá trị cảm xúc của kim cương tự nhiên, có ngân sách thoải mái và không quan tâm đến giá trị bán lại.',
    alternatives: [
      {
        name: 'Nhẫn kim cương lab-grown 0.7ct',
        brand: 'Lightbox (De Beers)',
        url: 'https://lightbox.jewelry/',
        priceRange: '~30–35 triệu VND',
        whyBetter:
          'Cùng ngân sách nhưng viên đá lớn hơn 40%, chất lượng tương đương (cắt Excellent, màu G, VS). Mất giá bán lại nhưng viên tự nhiên 0.5ct cũng mất giá tương tự.',
      },
      {
        name: 'Nhẫn kim cương 0.4ct PNJ',
        brand: 'PNJ',
        url: 'https://www.pnj.com.vn/',
        priceRange: '~28–32 triệu VND',
        whyBetter:
          'Thương hiệu uy tín Việt Nam, kim cương tự nhiên có GIA, giá rẻ hơn ~30% cho thông số tương tự.',
      },
    ],
    targetBudget: 'high',
  },
  {
    name: 'Dây Chuyền Kim Cương 0.3 Carat',
    category: 'necklace',
    material: 'Vàng Trắng 14K',
    price: 32000000,
    oldPrice: 39000000,
    image: '/products/diamond-necklace.jpg',
    images: ['/products/diamond-necklace.jpg'],
    description:
      'Dây chuyền mặt kim cương 0.3 carat, giác cắt brilliant, gắn trên dây vàng trắng 14K mảnh. Thiết kế tối giản, phù hợp đeo hàng ngày.',
    carat: 0.3,
    cutGrade: 'Good',
    colorGrade: 'I',
    clarityGrade: 'SI2',
    origin: 'Tự nhiên',
    badge: 'Perfect Gift',
    marketingTactics: [
      {
        tactic: 'Nhãn "Perfect Gift" / "Quà tặng hoàn hảo"',
        decoded:
          'Định vị sản phẩm như món quà cảm xúc, khiến người mua tập trung vào ý nghĩa thay vì so sánh giá trị thực của viên đá.',
      },
      {
        tactic: 'Vàng trắng 14K thay vì 18K',
        decoded:
          '14K rẻ hơn 18K đáng kể về giá trị kim loại, nhưng được marketing như "bền hơn". Thực tế là để giảm giá thành sản phẩm.',
      },
      {
        tactic: 'Tổng 0.3ct nhưng không ghi rõ carat mặt dây',
        decoded:
          'Có thể là 1 viên 0.3ct HOẶC nhiều viên nhỏ cộng lại. Nếu là nhiều viên nhỏ, tổng diện tích lấp lánh nhưng mỗi viên gần như vô giá trị riêng.',
      },
    ],
    whyNotToBuy: [
      {
        reason: '0.3ct quá nhỏ, gần như không ai nhận ra là kim cương',
        detail:
          'Viên 0.3ct đường kính ~4mm. Người ngoài sẽ tưởng là zirconia. Bạn trả tiền kim cương nhưng không nhận được "tầm nhìn" kim cương.',
        severity: 'high',
      },
      {
        reason: 'Thông số thấp (màu I, SI2)',
        detail:
          'Màu I hơi ngả vàng, SI2 có thể thấy tạp chất bằng mắt thường khi nhìn kỹ. Ở mức giá 32tr, bạn xứng đáng được thông số tốt hơn.',
        severity: 'medium',
      },
      {
        reason: 'Dây 14K mỏng dễ đứt',
        detail:
          'Dây mảnh trông thanh lịch nhưng dễ vướng và đứt khi đeo hàng ngày. Mất dây = mất cả mặt kim cương.',
        severity: 'medium',
      },
    ],
    honestVerdict:
      'Với 32 triệu cho một viên 0.3ct thông số thấp, bạn đang trả chủ yếu cho ý nghĩa "kim cương" chứ không phải giá trị thực. Có lựa chọn đẹp hơn.',
    whenToBuy:
      'Khi bạn thích sự tinh tế nhỏ gọn, không quan tâm người khác có nhận ra là kim cương hay không.',
    alternatives: [
      {
        name: 'Dây chuyền mặt ngọc trai Akoya',
        brand: 'Jemmia',
        url: 'https://jemmia.vn/',
        priceRange: '~8–12 triệu VND',
        whyBetter:
          'Ngọc trai Akoya cultured sang trọng, dễ nhận biết, giá chỉ 1/3. Phù hợp đeo hàng ngày hơn.',
      },
      {
        name: 'Dây chuyền lab-grown 0.5ct',
        brand: 'Lightbox',
        url: 'https://lightbox.jewelry/',
        priceRange: '~20–25 triệu VND',
        whyBetter:
          'Viên đá lớn hơn 60%, thông số tốt hơn với giá rẻ hơn. Nếu đã chấp nhận viên nhỏ thì lab-grown là lựa chọn hợp lý hơn.',
      },
    ],
    targetBudget: 'mid',
  },
  {
    name: 'Nhẫn Kim Cương Lab-Grown 1 Carat',
    category: 'ring',
    material: 'Bạch Kim (Platinum)',
    price: 55000000,
    oldPrice: 68000000,
    image: '/products/lab-grown-diamond-ring.jpg',
    images: ['/products/lab-grown-diamond-ring.jpg'],
    description:
      'Nhẫn solitaire 1 carat kim cương nuôi cấy (lab-grown), giác cắt Excellent, màu G, độ tinh khiết VS1, gắn trên vỏ bạch kim. Kích thước ấn tượng.',
    carat: 1,
    cutGrade: 'Excellent',
    colorGrade: 'G',
    clarityGrade: 'VS1',
    origin: 'Lab-grown',
    badge: 'Eco-Friendly',
    marketingTactics: [
      {
        tactic: 'Nhãn "Eco-Friendly" / "Bền vững"',
        decoded:
          'Định vị lab-grown như lựa chọn đạo đức. Thực tế năng lượng nuôi cấy kim cương rất lớn; "eco" là marketing, không phải sự thật tuyệt đối.',
      },
      {
        tactic: '"1 Carat chỉ 55 triệu"',
        decoded:
          'Dùng carat lớn để thu hút, che giấu thực tế lab-grown mất giá cực nhanh. Cùng viên đá này 2 năm trước giá ~80tr, nay 55tr và còn giảm.',
      },
      {
        tactic: 'Bạch kim = "cao cấp"',
        decoded:
          'Bạch kim nặng và đắt, nhưng độ sáng kém hơn vàng trắng rhodium. Khách hàng thường trả premium cho bạch kim vì cảm giác "luxury" mà không biết nhược điểm.',
      },
    ],
    whyNotToBuy: [
      {
        reason: 'Lab-grown mất giá nhanh chóng',
        detail:
          'Giá lab-grown giảm ~30% mỗi năm do năng suất sản xuất tăng. Mua 55tr hôm nay, 1 năm sau giá thị trường có thể chỉ còn 35–40tr. Giá trị bán lại gần như bằng 0.',
        severity: 'high',
      },
      {
        reason: 'Mua carat lớn để "khoe" thì phí tiền',
        detail:
          'Nếu mục tiêu là ấn tượng, lab-grown 1ct rất hợp lý. Nhưng nếu bạn coi đây là "tài sản" thì đây là lựa chọn tồi — không khác gì mua điện thoại xịn rồi mất giá.',
        severity: 'medium',
      },
      {
        reason: 'Bạch kim nặng tay, dễ trầy',
        detail:
          'Bạch kim dẻo nên khi va đập tạo vết lõm thay vì vết xước (như vàng). Cần đánh bóng định kỳ. Nặng hơn vàng trắng 60% nên cảm giác đeo nặng hơn.',
        severity: 'low',
      },
    ],
    honestVerdict:
      'Là lựa chọn RẤT TỐT nếu bạn muốn viên kim cương lớn để ĐEO và không quan tâm giá trị bán lại. Là lựa chọn TỒI nếu bạn coi đây là đầu tư.',
    whenToBuy:
      'Khi bạn hiểu rõ lab-grown là "kim cương để đeo" chứ không phải "kim cương để tích sản", và muốn viên đá lớn nhất có thể với ngân sách.',
    alternatives: [
      {
        name: 'Kim cương tự nhiên 0.5ct cùng giá',
        brand: 'PNJ / DOJI',
        url: 'https://www.pnj.com.vn/',
        priceRange: '~45–55 triệu VND',
        whyBetter:
          'Giữ giá trị tốt hơn, có giấy GIA. Đánh đổi là viên đá nhỏ hơn một nửa. Phù hợp nếu coi là tài sản.',
      },
      {
        name: 'Nhẫn moissanite 1.5ct',
        brand: 'Charles & Colvard',
        url: 'https://www.charlesandcolvard.com/',
        priceRange: '~8–15 triệu VND',
        whyBetter:
          'Độ lấp lánh cao hơn kim cương, to hơn, giá chỉ 1/4. Nếu chỉ cần "đẹp và lấp lánh" thì moissanite là lựa chọn cực kỳ hợp lý.',
      },
    ],
    targetBudget: 'high',
  },
  {
    name: 'Hoa Tai Kim Cương 0.2 Carat',
    category: 'earring',
    material: 'Vàng 18K',
    price: 18000000,
    oldPrice: 22000000,
    image: '/products/diamond-earrings.jpg',
    images: ['/products/diamond-earrings.jpg'],
    description:
      'Hoa tai stud kim cương 0.2 carat tổng (0.1ct mỗi bên), giác cắt brilliant, gắn trên vỏ 4 chấu vàng 18K. Nhỏ gọn, đeo hàng ngày.',
    carat: 0.2,
    cutGrade: 'Very Good',
    colorGrade: 'H',
    clarityGrade: 'SI1',
    origin: 'Tự nhiên',
    badge: 'Best Seller',
    marketingTactics: [
      {
        tactic: 'Nhãn "Best Seller" / "Everyday Luxury"',
        decoded:
          'Tạo cảm giác phổ biến và được yêu thích, kích thích mua theo đám đông. "Everyday luxury" làm khách hàng thấy 18tr là "rẻ" cho món đồ đeo hàng ngày.',
      },
      {
        tactic: '"Tổng 0.2 carat" thay vì ghi rõ 0.1ct mỗi bên',
        decoded:
          'Ghi tổng carat để con số nghe ấn tượng hơn. Thực tế mỗi bên chỉ 0.1ct (~3mm) — nhỏ như hạt đậu.',
      },
    ],
    whyNotToBuy: [
      {
        reason: '0.1ct mỗi bên cực kỳ nhỏ',
        detail:
          'Đường kính 3mm gần như không thể phân biệt với zirconia hay pha lê. Bạn trả giá kim cương nhưng không nhận được "hiệu ứng kim cương".',
        severity: 'high',
      },
      {
        reason: 'Markup cao cho hoa tai nhỏ',
        detail:
          'Hoa tai 0.2ct tổng có giá nhập ~6–8tr. Bán 18tr là markup ~125%. Phí chế tác hoa tai nhỏ không cao tới mức đó.',
        severity: 'medium',
      },
    ],
    honestVerdict:
      'Sản phẩm "khỏe" vì dễ bán, không phải vì giá trị tốt. Với 18tr bạn có thể có lựa chọn đẹp và lớn hơn nhiều.',
    whenToBuy:
      'Quà tặng cho người trẻ/teenager, người đeo hàng ngày thích sự tinh tế tối đa, không quan tâm đến carat.',
    alternatives: [
      {
        name: 'Hoa tai lab-grown 0.5ct tổng',
        brand: 'Lightbox',
        url: 'https://lightbox.jewelry/',
        priceRange: '~12–15 triệu VND',
        whyBetter:
          'Lớn gấp 2.5 lần, cùng ngân sách hoặc rẻ hơn. Đeo hàng ngày lấp lánh hơn rõ rệt.',
      },
      {
        name: 'Hoa tai ngọc trai Akoya',
        brand: 'Jemmia',
        url: 'https://jemmia.vn/',
        priceRange: '~5–8 triệu VND',
        whyBetter:
          'Ngọc trai 6–7mm sang trọng, dễ nhận biết, giá chỉ 1/3. Phù hợp đeo hàng ngày hơn và giữ hình ảnh "nữ tính".',
      },
    ],
    targetBudget: 'mid',
  },
  {
    name: 'Lắc Tay Kim Cương Vàng Hồng',
    category: 'bracelet',
    material: 'Vàng Hồng 14K',
    price: 28000000,
    oldPrice: 35000000,
    image: '/products/diamond-bracelet.jpg',
    images: ['/products/diamond-bracelet.jpg'],
    description:
      'Lắc tay tennis kiểu, vàng hồng 14K với hàng kim cương nhỏ dọc thân. Phong cách nữ tính, hợp xu hướng.',
    carat: 0.4,
    cutGrade: 'Good',
    colorGrade: 'I',
    clarityGrade: 'SI2',
    origin: 'Tự nhiên',
    badge: 'Trending',
    marketingTactics: [
      {
        tactic: 'Vàng hồng = "Feminine" / "Trending"',
        decoded:
          'Tận dụng xu hướng vàng hồng để định giá cao. Hợp kim vàng hồng (vàng + đồng) thực ra rẻ hơn vàng trắng, nhưng được bán đắt hơn vì "trend".',
      },
      {
        tactic: 'Tổng 0.4ct spread ra trên cả lắc',
        decoded:
          'Spread carat trên nhiều viên nhỏ tạo cảm giác "nhiều kim cương". Thực tế mỗi viên nhỏ gần như vô giá trị riêng và tổng diện tích lấp lánh kém hơn 1 viên 0.4ct.',
      },
    ],
    whyNotToBuy: [
      {
        reason: 'Lắc tay dễ va chạm, kim cương dễ rớt',
        detail:
          'Cổ tay tiếp xúc nhiều với bàn phím, cửa, bàn... Lắc tennis với nhiều viên kim cương nhỏ có nguy cơ rớt đá cao. Khi mất 1 viên, cả lắc mất thẩm mỹ.',
        severity: 'high',
      },
      {
        reason: 'Vàng hồng 14K dễ xước, lớp hồng phai',
        detail:
          '14K mềm, lớp màu hồng (đồng) có thể phai theo thời gian, đặc biệt khi tiếp xúc hóa chất (nước hoa, xà phòng). Cần xi lại màu định kỳ.',
        severity: 'medium',
      },
      {
        reason: 'Tổng carat spread = không ấn tượng',
        detail:
          '0.4ct trên 10–15 viên nhỏ trông như lấp lánh "phụ", không tạo điểm nhấn. Cùng tiền mua 1 viên 0.4ct trên nhẫn sẽ ấn tượng hơn.',
        severity: 'medium',
      },
    ],
    honestVerdict:
      'Đẹp nhưng rủi ro cao (mất đá) và giá trị kim cương spread không ấn tượng. Phù hợp đeo thỉnh thoảng, không nên đeo hàng ngày.',
    whenToBuy:
      'Khi bạn thích phong cách nữ tính, đeo thỉnh thoảng vào dịp, và chấp nhận rủi ro mất đá.',
    alternatives: [
      {
        name: 'Lắc tay vàng 18K không đá',
        brand: 'PNJ',
        url: 'https://www.pnj.com.vn/',
        priceRange: '~15–20 triệu VND',
        whyBetter:
          'Giữ giá trị vàng tốt hơn, không rủi ro mất đá, đeo hàng ngày thoải mái. Thiết kế hiện đại nhiều.',
      },
      {
        name: 'Lắc tennis lab-grown 1ct tổng',
        brand: 'Lightbox',
        url: 'https://lightbox.jewelry/',
        priceRange: '~25–30 triệu VND',
        whyBetter:
          'Tổng carat gấp 2.5 lần cùng giá, lấp lánh hơn rõ rệt. Vẫn có rủi ro mất đá nhưng giá trị viên nhỏ lab-grown thấp nên chấp nhận được.',
      },
    ],
    targetBudget: 'mid',
  },
  {
    name: 'Nhẫn Cầu Hôn Kim Cương 1 Carat',
    category: 'ring',
    material: 'Bạch Kim (Platinum)',
    price: 120000000,
    oldPrice: 145000000,
    image: '/products/proposal-ring.jpg',
    images: ['/products/proposal-ring.jpg'],
    description:
      'Nhẫn cầu hôn 1 carat kim cương tự nhiên, halo pavé kim cương quanh tâm, vỏ bạch kim. Kiểu dáng cầu hôn lãng mạn.',
    carat: 1,
    cutGrade: 'Good',
    colorGrade: 'J',
    clarityGrade: 'I1',
    origin: 'Tự nhiên',
    badge: 'Forever Collection',
    marketingTactics: [
      {
        tactic: '"Forever" / "Proposal Collection"',
        decoded:
          'Mượn chiến lược "A Diamond is Forever" của De Beers (1947) — câu slogan đã tạo ra toàn bộ thị trường kim cương cầu hôn. Mục đích: gắn kim cương với tình yêu vĩnh cửu để hợp thức hóa giá cao.',
      },
      {
        tactic: '"Investment Grade" / "Đầu tư"',
        decoded:
          'Gọi 1ct là "đầu tư" là cách bán sai. Kim cương retail mất 30–50% giá ngay khi ra khỏi cửa hàng. Chỉ kim cương hiếm (3ct+, màu D, FL) mới thực sự giữ giá.',
      },
      {
        tactic: 'Quy tắc "2 tháng lương cho nhẫn cầu hôn"',
        decoded:
          'Đây là chiến dịch marketing của De Beers từ thập niên 1980, không phải quy tắc nào cả. Bắt nguồn từ quảng cáo, nay thành "truyền thống".',
      },
      {
        tactic: '1ct với thông số J/I1',
        decoded:
          'Đẩy carat lên 1ct (ấn tượng) nhưng giảm thông số (màu J ngả vàng, I1 có tạp chất thấy bằng mắt) để giữ giá. Khách hàng được "1 carat" nhưng viên đá nhìn kém sáng và có vết.',
      },
    ],
    whyNotToBuy: [
      {
        reason: 'Thông số J/I1 — viên đá kém',
        detail:
          'Màu J ngả vàng rõ, độ tinh khiết I1 có tạp chất nhìn thấy bằng mắt thường. 120 triệu cho viên 1ct nhưng "xấu" — thà mua 0.7ct màu G/VS2 đẹp hơn với cùng giá.',
        severity: 'high',
      },
      {
        reason: '"Đầu tư" là lời nói dối',
        detail:
          'Kim cương retail 1ct J/I1 resale chỉ ~40–60 triệu (mất 50%). Nếu muốn "đầu tư" thì đây là lựa chọn sai hoàn toàn. Mua vàng 24k hoặc kim cương hiếm hơn.',
        severity: 'high',
      },
      {
        reason: 'Halo pavé che giấu viên tâm kém',
        detail:
          'Halo kim cương nhỏ quanh tâm tạo ảo giác viên tâm lớn và sáng hơn. Thực tế là để che viên tâm J/I1 kém. Khi viên halo (rất nhỏ) rớt, nhẫn trông xấu đi.',
        severity: 'medium',
      },
      {
        reason: 'Áp lực "2 tháng lương"',
        detail:
          'Bạn đang để marketing De Beers quyết định ngân sách. Hãy mua theo khả năng tài chính thực và ý nghĩa, không theo "quy tắc" quảng cáo.',
        severity: 'medium',
      },
    ],
    honestVerdict:
      'Sản phẩm dùng carat lớn để thu hút nhưng thông số kém, che giấu bằng halo. Bạn trả tiền cho "1 carat" trên giấy, không phải viên đá đẹp. Nên cân nhắc kỹ.',
    whenToBuy:
      'Chỉ khi bạn đã hiểu rõ 4C, chấp nhận viên J/I1 vì muốn carat 1 trên giấy, và mua vì ý nghĩa cầu hôn chứ không phải đầu tư.',
    alternatives: [
      {
        name: 'Nhẫn 0.7ct G/VS2 (tự nhiên)',
        brand: 'PNJ / DOJI',
        url: 'https://www.pnj.com.vn/',
        priceRange: '~90–110 triệu VND',
        whyBetter:
          'Viên đá ĐẸP HƠN rõ rệt (sáng, không tạp chất), nhỏ hơn một chút nhưng chất lượng cao. Cùng ngân sách hoặc rẻ hơn.',
      },
      {
        name: 'Nhẫn lab-grown 1.5ct E/VVS2',
        brand: 'Lightbox',
        url: 'https://lightbox.jewelry/',
        priceRange: '~70–90 triệu VND',
        whyBetter:
          'Viên LỚN HƠN và ĐẸP HƠN (màu E, VVS2) với giá rẻ hơn 30%. Nếu không quan tâm resale, đây là lựa chọn vượt trội về "đẹp".',
      },
      {
        name: 'Tiffany Soleste 1ct',
        brand: 'Tiffany & Co.',
        url: 'https://www.tiffany.com/',
        priceRange: '~250–350 triệu VND',
        whyBetter:
          'Đắt hơn nhiều nhưng thông số thực sự cao (D-F, IF-VS), giữ giá tốt hơn, trải nghiệm thương hiệu cao cấp. Nếu đã chi nhiều, hãy chọn chất lượng.',
      },
    ],
    targetBudget: 'luxury',
  },
  {
    name: 'Dây Chuyền Ngọc Trai Cultured',
    category: 'pearl',
    material: 'Bạc 925',
    price: 8500000,
    oldPrice: 11000000,
    image: '/products/pearl-necklace.jpg',
    images: ['/products/pearl-necklace.jpg'],
    description:
      'Dây chuyền ngọc trai nuôi (cultured) Akoya, chuỗigraduated, khung bạc 925. Phong cách cổ điển, thanh lịch.',
    cutGrade: 'Akoya 7-7.5mm',
    origin: 'Cultured (nuôi)',
    badge: 'Classic',
    marketingTactics: [
      {
        tactic: 'Nhãn "Classic" / "Timeless"',
        decoded:
          'Gắn ngọc trai với hình ảnh quý tộc, Audrey Hepburn. Che giấu thực tế đây là ngọc trai nuôi (cultured) — giá trị thấp hơn ngọc trai tự nhiên rất nhiều.',
      },
      {
        tactic: 'Không nhấn mạnh "cultured"',
        decoded:
          'Ngọc trai cultured (nuôi) chiếm 99% thị trường, nhưng marketing thường lảng tránh để khách hàng tưởng gần với ngọc trai tự nhiên.',
      },
      {
        tactic: 'Khung bạc 925 thay vì vàng',
        decoded:
          'Bạc rẻ hơn vàng nhiều nhưng được marketing như "phong cách". Thực tế để giảm giá thành. Bạc sẽ xỉn đen nhanh.',
      },
    ],
    whyNotToBuy: [
      {
        reason: 'Ngọc trai cultured giá trị thấp',
        detail:
          'Chuỗi Akoya cultured 7mm giá nhập ~2–3tr. Bán 8.5tr là markup ~200%. Ngọc trai cultured gần như không có giá trị bán lại.',
        severity: 'high',
      },
      {
        reason: 'Khung bạc 925 sẽ xỉn đen',
        detail:
          'Bạc bị oxy hóa khi tiếp xúc không khí, mồ hôi, hóa chất. Sau 3–6 tháng cần đánh bóng. Khung bạc làm giảm sự sang trọng của ngọc trai.',
        severity: 'medium',
      },
      {
        reason: '8.5tr cho bạc + cultured là hơi cao',
        detail:
          'Với ngân sách này bạn có thể có khung vàng 14K + ngọc trai cultured chất lượng tương tự từ các xưởng VN.',
        severity: 'medium',
      },
    ],
    honestVerdict:
      'Đẹp kiểu cổ điển nhưng markup cao và khung bạc làm giảm giá trị lâu dài. Nên cân nhắc phiên bản khung vàng nếu thích ngọc trai.',
    whenToBuy:
      'Khi bạn thích ngọc trai cổ điển, đeo thỉnh thoảng, chấp nhận khung bạc cần bảo dưỡng.',
    alternatives: [
      {
        name: 'Dây ngọc trai Akoya khung vàng 14K',
        brand: 'Jemmia',
        url: 'https://jemmia.vn/',
        priceRange: '~10–14 triệu VND',
        whyBetter:
          'Khung vàng giữ giá trị, không xỉn. Cùng chất lượng ngọc trai, chỉ đắt hơn chút nhưng bền và sang hơn nhiều.',
      },
      {
        name: 'Dây ngọc trai Hanadama (top Akoya)',
        brand: 'Pearl Paradise',
        url: 'https://www.pearlparadise.com/',
        priceRange: '~15–20 triệu VND',
        whyBetter:
          'Chất lượng ngọc trai cao nhất (Hanadama = top grade), độ sáng và độ tròn vượt trội. Nếu đã thích ngọc trai, hãy chọn grade cao.',
      },
    ],
    targetBudget: 'low',
  },
  {
    name: 'Nhẫn Vàng 24K Trơn',
    category: 'ring',
    material: 'Vàng 24K',
    price: 15000000,
    oldPrice: 16200000,
    image: '/products/gold-ring-24k.jpg',
    images: ['/products/gold-ring-24k.jpg'],
    description:
      'Nhẫn vàng 24K (999.9) trơn, thiết kế cổ điển. Phù hợp tích trữ giá trị và đeo dịp lễ.',
    badge: 'Investment',
    marketingTactics: [
      {
        tactic: 'Nhãn "Investment" / "Đầu tư"',
        decoded:
          'Vàng 24K ĐÚNG là tích trữ giá trị tốt (giá theo giá vàng thế giới). Nhưng nhẫn 24K thường có phí chế tác 5–10%, tức là mua đắt hơn giá vàng thỏi.',
      },
      {
        tactic: '"Vàng 24K nguyên chất = cao cấp nhất"',
        decoded:
          'Đúng về độ tinh khiết, nhưng 24K quá mềm cho trang sức đeo. "Cao cấp nhất" cho mục đích ĐẦU TƯ, không phải ĐEO.',
      },
    ],
    whyNotToBuy: [
      {
        reason: '24K quá mềm, dễ móp méo',
        detail:
          'Vàng 24K (99.99%) cực kỳ mềm. Đeo hàng ngày sẽ móp, xước, biến dạng nhanh chóng. Không phù hợp làm nhẫn đeo thường xuyên.',
        severity: 'high',
      },
      {
        reason: 'Phí chế tác 5–10% trên giá vàng',
        detail:
          'Nhẫn 24K bán 15tr nhưng giá vàng thỏi tương đương chỉ ~13.5–14tr. Nếu muốn TÍCH TRỮ, mua thỏi vàng hoặc nhẫn tròn trơn (cẩn thận) rẻ hơn.',
        severity: 'medium',
      },
      {
        reason: 'Thiết kế thường đơn điệu',
        detail:
          'Vì quá mềm, 24K khó gia công phức tạp. Nhẫn 24K thường chỉ là vòng trơn hoặc họa tiết đơn giản, ít thẩm mỹ so với 18K/14K.',
        severity: 'low',
      },
    ],
    honestVerdict:
      'Tuyệt vời để TÍCH TRỮ, tồi để ĐEO HÀNG NGÀY. Nếu mục tiêu là đeo, hãy chọn 18K hoặc 14K. Nếu mục tiêu là đầu tư, hãy mua thỏi vàng.',
    whenToBuy:
      'Mua vì ý nghĩa truyền thống/tích trữ, đeo thỉnh thoảng vào dịp lễ Tết, không đeo hàng ngày.',
    alternatives: [
      {
        name: 'Thỏi vàng 24K 1 chỉ',
        brand: 'DOJI / SJC',
        url: 'https://sjc.com.vn/',
        priceRange: '~5–6 triệu VND/chỉ',
        whyBetter:
          'Tích trữ thuần túy, không phí chế tác, dễ mua bán. Nếu mục tiêu là đầu tư thì thỏi vàng là lựa chọn chuẩn.',
      },
      {
        name: 'Nhẫn vàng 18K đeo hàng ngày',
        brand: 'PNJ',
        url: 'https://www.pnj.com.vn/',
        priceRange: '~10–15 triệu VND',
        whyBetter:
          'Cứng hơn, giữ dáng tốt, thiết kế đa dạng. Phù hợp đeo hàng ngày. Đánh đổi là giá trị vàng thấp hơn (75%).',
      },
    ],
    targetBudget: 'low',
  },
]

async function main() {
  console.log('Seeding products...')
  // Xóa dữ liệu cũ
  await db.product.deleteMany({})
  for (const p of products) {
    await db.product.create({
      data: {
        name: p.name,
        category: p.category,
        material: p.material,
        price: p.price,
        oldPrice: p.oldPrice ?? null,
        image: p.image,
        images: JSON.stringify(p.images),
        description: p.description,
        carat: p.carat ?? null,
        cutGrade: p.cutGrade ?? null,
        colorGrade: p.colorGrade ?? null,
        clarityGrade: p.clarityGrade ?? null,
        origin: p.origin ?? null,
        badge: p.badge ?? null,
        marketingTactics: JSON.stringify(p.marketingTactics),
        whyNotToBuy: JSON.stringify(p.whyNotToBuy),
        honestVerdict: p.honestVerdict,
        whenToBuy: p.whenToBuy,
        alternatives: JSON.stringify(p.alternatives),
        targetBudget: p.targetBudget,
      },
    })
    console.log('  ✓', p.name)
  }
  console.log(`Done. Seeded ${products.length} products.`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await db.$disconnect()
  })
