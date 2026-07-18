import { db } from '../src/lib/db'

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
          'Thương hiệu dùng cụm "tự nhiên" để tạo cảm giác khan hiếm và giá trị bền vững. Thực tế, trong điều kiện ánh sáng thông thường, khó phân biệt giữa kim cương tự nhiên và lab-grown cùng thông số. Bạn đang trả cho câu chuyện "tự nhiên" nhiều hơn là sự khác biệt về độ đẹp thực sự.',
      },
      {
        tactic: 'Giá gạch 58tr → giảm còn 45tr',
        decoded:
          'Cách bán phổ biến: đặt mức giá gốc cao rồi giảm để tạo cảm giác "được hời". Tuy nhiên, mức 58tr hiếm khi là giá thực bán hàng ngày. Điểm giá thực tế có thể chỉ quanh 42–45tr.',
      },
      {
        tactic: 'Câu chuyện "mỗi viên kim cương là duy nhất"',
        decoded:
          'Đây là chiến lược cảm xúc hợp lý hóa mức giá. Mỗi viên tự nhiên có tạp chất khác nhau, nhưng sự "duy nhất" đó không tự động đồng nghĩa với giá trị cao hơn so với lab-grown cùng thông số.',
      },
    ],
    whyNotToBuy: [
      {
        reason: 'Nếu bạn đang so sánh để tìm viên lớn nhất với cùng ngân sách',
        detail:
          'Với 45tr, lab-grown có thể cho bạn viên 0.7–0.8ct cùng thông số — lớn hơn rõ rệt. Sản phẩm này phù hợp nếu bạn ưu tiên "tự nhiên" hơn kích thước.',
        severity: 'medium',
      },
      {
        reason: 'Nếu bạn cần đeo hàng ngày và lo ngại xước',
        detail:
          'Vàng 18K mềm hơn bạch kim, sau thời gian dài đeo có thể xuất hiện vết xước nhẹ và cần đánh bóng định kỳ. Nếu nhu cầu là "đeo thoải mái không lo bảo dưỡng", bạch kim sẽ phù hợp hơn.',
        severity: 'low',
      },
    ],
    honestVerdict:
      'Một lựa chọn an toàn và thanh lịch nếu bạn thích câu chuyện kim cương tự nhiên. Với cùng ngân sách, bạn có thể cân nhắc giữa "viên nhỏ hơn nhưng tự nhiên" và "viên lớn hơn nhưng lab-grown" — cả hai đều có lý do chọn.',
    whenToBuy:
      'Khi bạn trân trọng ý nghĩa cảm xúc của viên đá tự nhiên, có ngân sách riêng và ưu tiên sự thanh lịch cổ điển hơn kích thước ấn tượng.',
    alternatives: [
      {
        name: 'Nhẫn kim cương lab-grown 0.7ct',
        brand: 'Lightbox (De Beers)',
        url: 'https://lightbox.jewelry/',
        priceRange: '~30–35 triệu VND',
        whyBetter:
          'Cùng ngân sách nhưng viên đá lớn hơn 40%, thông số tương đương. Phù hợp nếu mục tiêu là kích thước và độ lấp lánh tối đa.',
      },
      {
        name: 'Nhẫn kim cương 0.4ct PNJ',
        brand: 'PNJ',
        url: 'https://www.pnj.com.vn/',
        priceRange: '~28–32 triệu VND',
        whyBetter:
          'Thương hiệu Việt Nam uy tín, có giấy GIA, giá dễ tiếp cận hơn cho thông số tương tự.',
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
          'Cụm "hoàn hảo" định vị sản phẩm như món quà lý tưởng, khuyến khích mua theo cảm xúc hơn so sánh giá trị thực. Thực tế, "perfect" là cách nói bán hàng, không phải đánh giá kỹ thuật.',
      },
      {
        tactic: 'Vàng trắng 14K thay vì 18K',
        decoded:
          '14K tiết kiệm chi phí vật liệu hơn 18K, nhưng được định vị như lựa chọn "bền". Thực tế, 14K cứng hơn 18K — đúng một phần — nhưng chủ yếu để giá thành thấp hơn.',
      },
      {
        tactic: 'Tổng 0.3ct nhưng không ghi rõ carat mặt dây',
        decoded:
          'Nếu mặt dây gồm nhiều viên nhỏ, tổng carat có thể ấn tượng nhưng mỗi viên riêng lẻ gần như không đáng kể. Cần kiểm tra kỹ xem là 1 viên 0.3ct hay tổng nhiều viên nhỏ.',
      },
    ],
    whyNotToBuy: [
      {
        reason: 'Nếu bạn đang tìm kiếm viên kim cương tạo điểm nhấn rõ ràng',
        detail:
          'Viên 0.3ct đường kính ~4mm — vẫn tinh tế, nhưng không tạo điểm nhấn mạnh. Nếu bạn thích phong cách "lấp lánh rõ", có thể cân nhắc viên 0.5ct trở lên.',
        severity: 'medium',
      },
      {
        reason: 'Nếu bạn cần đeo hàng ngày trong môi trường thường xuyên tiếp xúc nước/hóa chất',
        detail:
          'Dây 14K mảnh đòi hỏi cẩn thận khi vận động nhiều hoặc tiếp xúc hóa chất thường xuyên. Nếu nhu cầu là "đeo thoải mái, ít lo bảo dưỡng", dây dày hơn hoặc chất liệu khác sẽ phù hợp hơn.',
        severity: 'low',
      },
    ],
    honestVerdict:
      'Một món quà tinh tế, phù hợp phong cách tối giản. Nếu bạn đánh giá cao sự nhỏ gọn và thanh lịch, sản phẩm này đáp ứng tốt. Nếu muốn viên to và nổi bật hơn, có lẽ nên xem xét các lựa chọn khác.',
    whenToBuy:
      'Khi bạn thích sự tinh tế nhỏ gọn, tặng người yêu thích phong cách minimal, hoặc đeo hàng ngày với phong cách nhẹ nhàng.',
    alternatives: [
      {
        name: 'Dây chuyền mặt ngọc trai Akoya',
        brand: 'Jemmia',
        url: 'https://jemmia.vn/',
        priceRange: '~8–12 triệu VND',
        whyBetter:
          'Ngọc trai sang trọng, dễ nhận biết, giá chỉ 1/3. Phù hợp nếu bạn muốn điểm nhấn khác biệt mà không cần kim cương.',
      },
      {
        name: 'Dây chuyền lab-grown 0.5ct',
        brand: 'Lightbox',
        url: 'https://lightbox.jewelry/',
        priceRange: '~20–25 triệu VND',
        whyBetter:
          'Viên đá lớn hơn rõ rệt, thông số tốt hơn. Phù hợp nếu mục tiêu chính là độ lấp lánh với ngân sách hợp lý.',
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
          'Lab-grown được định vị là lựa chọn "đạo đức" hơn tự nhiên. Thực tế, quá trình nuôi cấy tiêu tốn năng lượng đáng kể. Tuy nhiên, lab-grown rẻ hơn 60–70% so với tự nhiên cùng thông số là điều đáng cân nhắc.',
      },
      {
        tactic: '"1 Carat chỉ 55 triệu"',
        decoded:
          'Carat lớn là điểm thu hút chính. Nhưng cần biết rằng giá lab-grown đang giảm theo năng suất sản xuất — sản phẩm có thể rẻ hơn trong tương lai.',
      },
      {
        tactic: 'Bạch kim = "cao cấp"',
        decoded:
          'Bạch kim đúng là nguyên liệu bền và nặng, tạo cảm giác "đáng tiền". Nhưng nó cũng nặng hơn vàng trắng khoảng 60% và cần đánh bóng định kỳ do dễ xỉn màu.',
      },
    ],
    whyNotToBuy: [
      {
        reason: 'Nếu bạn đang tìm kiếm trang sức giữ giá trị dài hạn',
        detail:
          'Lab-grown có giá hiệu quả cao cho đeo hàng ngày, nhưng giá có thể thay đổi theo năng suất sản xuất. Nếu mục tiêu là "tài sản", vàng hoặc kim cương tự nhiên thông số cao có thể phù hợp hơn.',
        severity: 'medium',
      },
      {
        reason: 'Nếu bạn thích nhẫn nhẹ tênh, không quá nặng tay',
        detail:
          'Bạch kim nặng hơn vàng trắng đáng kể. Nếu bạn quen với vàng 18K và thích cảm giác "vừa phải", bạch kim có thể cảm thấy nặng hơn mong đợi.',
        severity: 'low',
      },
    ],
    honestVerdict:
      'Một lựa chọn thông minh nếu bạn muốn viên kim cương lớn để đeo hàng ngày, với ngân sách dễ chịu. Đánh đổi là không giữ giá bán lại — nhưng với nhiều người, trải nghiệm đeo viên lớn đẹp mỗi ngày đáng giá hơn.',
    whenToBuy:
      'Khi bạn muốn viên kim cương lớn nhất có thể với ngân sách, hiểu rằng đây là "kim cương để đeo" chứ không phải để tích sản.',
    alternatives: [
      {
        name: 'Kim cương tự nhiên 0.5ct cùng giá',
        brand: 'PNJ / DOJI',
        url: 'https://www.pnj.com.vn/',
        priceRange: '~45–55 triệu VND',
        whyBetter:
          'Giữ giá bán lại tốt hơn, có giấy GIA. Đánh đổi là viên đá nhỏ hơn một nửa. Phù hợp nếu bạn coi trang sức như tài sản dài hạn.',
      },
      {
        name: 'Nhẫn moissanite 1.5ct',
        brand: 'Charles & Colvard',
        url: 'https://www.charlesandcolvard.com/',
        priceRange: '~8–15 triệu VND',
        whyBetter:
          'Độ lấp lánh vượt trội, viên to hơn, giá chỉ 1/4. Nếu mục tiêu chính là "đẹp và nổi bật" thì đây là lựa chọn cực kỳ sáng suốt.',
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
          '"Best Seller" tạo cảm giác phổ biến và đáng tin, khuyến khích mua theo đám đông. "Everyday luxury" gợi ý rằng 18tr là mức giá "hợp lý" cho đồ đeo hàng ngày — nhưng hãy xem xét xem liệu viên đá có đáp ứng kỳ vọng của bạn không.',
      },
      {
        tactic: '"Tổng 0.2 carat" thay vì ghi rõ 0.1ct mỗi bên',
        decoded:
          'Con số "0.2" nghe lớn hơn thực tế mỗi bên chỉ 0.1ct (~3mm). Nếu bạn đang tìm hoa tai "nổi bật", số đo thực tế có thể nhỏ hơn mong đợi.',
      },
    ],
    whyNotToBuy: [
      {
        reason: 'Nếu bạn đang tìm kiếm hoa tai tạo hiệu ứng nổi bật',
        detail:
          '0.1ct mỗi bên (~3mm) là kích thước tinh tế, nhưng không tạo hiệu ứng "wow" rõ rệt. Nếu phong cách của bạn là nổi bật, có lẽ nên xem xét 0.3–0.5ct trở lên.',
        severity: 'medium',
      },
      {
        reason: 'Nếu bạn muốn tối ưu tỷ lệ "đá/giá"',
        detail:
          'Với 18tr cho 0.2ct tổng, bạn đang trả cho chất liệu vàng 18K cũng như thương hiệu. Cùng ngân sách có thể tìm được viên lớn hơn đáng kể ở lab-grown hoặc moissanite.',
        severity: 'low',
      },
    ],
    honestVerdict:
      'Lựa chọn an toàn cho người thích sự tinh tế, đeo hàng ngày mà không cần quá nhiều sự chú ý. Phù hợp nếu bạn đánh giá cao sự nhẹ nhàng và thanh lịch.',
    whenToBuy:
      'Quà tặng cho người thích phong cách tối giản, đeo hàng ngày với vẻ ngoài nhẹ nhàng.',
    alternatives: [
      {
        name: 'Hoa tai lab-grown 0.5ct tổng',
        brand: 'Lightbox',
        url: 'https://lightbox.jewelry/',
        priceRange: '~12–15 triệu VND',
        whyBetter:
          'Lớn gấp 2.5 lần, cùng ngân sách hoặc rẻ hơn. Đeo hàng ngày vẫn lấp lánh rõ hơn.',
      },
      {
        name: 'Hoa tai ngọc trai Akoya',
        brand: 'Jemmia',
        url: 'https://jemmia.vn/',
        priceRange: '~5–8 triệu VND',
        whyBetter:
          'Ngọc trai 6–7mm sang trọng, dễ nhận biết, giá chỉ 1/3. Phù hợp nếu bạn muốn phong cách nữ tính, cổ điển.',
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
          'Xu hướng vàng hồng được dùng để tạo cảm giác hiện đại và nữ tính. Thực tế, vàng hồng 14K (vàng + đồng) có giá kim loại thấp hơn vàng trắng, nhưng được bán đắt hơn nhờ "trend".',
      },
      {
        tactic: 'Tổng 0.4ct spread ra trên cả lắc',
        decoded:
          'Spread carat trên nhiều viên nhỏ tạo cảm giác "nhiều kim cương". Tổng diện tích lấp lánh có thể kém hơn một viên carat lớn, nhưng phong cách "dải sao" có sức hút riêng.',
      },
    ],
    whyNotToBuy: [
      {
        reason: 'Nếu bạn thường xuyên vận động, nấu ăn hoặc làm việc tay',
        detail:
          'Lắc tennis có nhiều viên nhỏ, nguy cơ mất đá khi va chạm cao hơn nhẫn đơn. Nếu bạn thường xuyên vận động, đánh tennis, nấu ăn... một chiếc nhẫn đơn có thể an toàn hơn.',
        severity: 'medium',
      },
      {
        reason: 'Nếu bạn thích vẻ ngoài cứng cáp, ít cần chăm sóc',
        detail:
          'Vàng hồng 14K lớp màu hồng có thể phai nhẹ theo thời gian nếu thường xuyên tiếp xúc hóa chất, nước hoa. Bạch kim hoặc vàng trắng 18K giữ màu ổn định hơn.',
        severity: 'low',
      },
    ],
    honestVerdict:
      'Một món đồ phong cách, phù hợp cho nàng thích xu hướng vàng hồng. Nếu bạn chăm sóc trang sức đều đặn và đeo theo dịp, lắc này rất đáng yêu.',
    whenToBuy:
      'Khi bạn thích phong cách nữ tính, đeo dịp và chấp nhận xi màu định kỳ để giữ vẻ mới.',
    alternatives: [
      {
        name: 'Lắc tay vàng 18K không đá',
        brand: 'PNJ',
        url: 'https://www.pnj.com.vn/',
        priceRange: '~15–20 triệu VND',
        whyBetter:
          'Giữ giá trị vàng tốt hơn, không rủi ro mất đá, đeo hàng ngày thoải mái.',
      },
      {
        name: 'Lắc tennis lab-grown 1ct tổng',
        brand: 'Lightbox',
        url: 'https://lightbox.jewelry/',
        priceRange: '~25–30 triệu VND',
        whyBetter:
          'Tổng carat lớn hơn, lấp lánh rõ hơn với cùng giá. Phù hợp nếu mục tiêu chính là độ nổi bật.',
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
          'Thuật ngữ "forever" gắn kim cương với ý nghĩa tình yêu vĩnh cửu — một chiến lược cảm xúc rất thành công từ thập niên 1947. Nó giúp người mua kết nối cảm xúc với sản phẩm, nhưng đồng thời cũng đẩy giá trị tâm lý lên cao.',
      },
      {
        tactic: '"Investment Grade" / "Đầu tư"',
        decoded:
          'Khái niệm "đầu tư" thường được dùng cho kim cương lớn và hiếm. Với 1ct thông số J/I1 ở phân khúc retail, giá trị bán lại thực tế thường thấp hơn nhiều so với giá mua ban đầu.',
      },
      {
        tactic: 'Quy tắc "2 tháng lương cho nhẫn cầu hôn"',
        decoded:
          'Quy tắc này bắt nguồn từ chiến dịch quảng cáo của De Beers những năm 1980, không phải một quy luật tài chính. Ngày nay, nhiều cặp đôi chọn ngân sách dựa trên hoàn cảnh riêng thay vì theo "quy tắc" quảng cáo.',
      },
      {
        tactic: '1ct với thông số J/I1',
        decoded:
          'Carat lớn tạo ấn tượng đầu tiên, nhưng thông số J/I1 có nghĩa là viên đá có màu ngả vàng nhẹ và tạp chất có thể nhìn thấy bằng mắt thường. Halo pavé xung quanh giúp cân bằng tổng thể, nhưng phần lớn lấp lánh thực tế đến từ viên halo nhỏ.',
      },
    ],
    whyNotToBuy: [
      {
        reason: 'Nếu bạn đánh giá cao độ sáng và độ trong của viên đá hơn con số carat',
        detail:
          'Viên 1ct J/I1 sẽ không sáng và trong như viên 0.7ct màu G/VS2. Nếu điều quan trọng với bạn là viên đá thực sự đẹp khi nhìn trực tiếp, thông số cao hơn carat lớn.',
        severity: 'medium',
      },
      {
        reason: 'Nếu bạn muốn trang sức giữ giá trị theo thời gian',
        detail:
          'Kim cương retail với thông số J/I1 có giá bán lại thường thấp hơn đáng kể so với giá mua. Nếu coi đây là tài sản dài hạn, có lẽ nên xem xét thông số cao hơn.',
        severity: 'low',
      },
    ],
    honestVerdict:
      'Một lựa chọn phổ biến với ý nghĩa cảm xúc mạnh. Nếu bạn yêu thích kiểu dáng halo lãng mạn và đánh giá cao biểu tượng "1 carat" cho dịp cầu hôn, sản phẩm này hoàn toàn phù hợp. Nếu bạn muốn viên đá thực sự sáng và trong, cân nhắc thông số cao hơn.',
    whenToBuy:
      'Khi bạn đã hiểu rõ về 4C, chọn theo cảm xúc và ý nghĩa dịp cầu hôn, và ngân sách phù hợp với hoàn cảnh cá nhân — không theo quy tắc quảng cáo.',
    alternatives: [
      {
        name: 'Nhẫn 0.7ct G/VS2 (tự nhiên)',
        brand: 'PNJ / DOJI',
        url: 'https://www.pnj.com.vn/',
        priceRange: '~90–110 triệu VND',
        whyBetter:
          'Viên đá sáng và trong hơn rõ rệt, cùng ngân sách hoặc rẻ hơn. Phù hợp nếu chất lượng viên đá là ưu tiên hàng đầu.',
      },
      {
        name: 'Nhẫn lab-grown 1.5ct E/VVS2',
        brand: 'Lightbox',
        url: 'https://lightbox.jewelry/',
        priceRange: '~70–90 triệu VND',
        whyBetter:
          'Viên lớn hơn, thông số vượt trội, giá rẻ hơn 30%. Nếu bạn không cần "tự nhiên" thì đây là giá trị hiệu quả hơn.',
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
      'Dây chuyền ngọc trai nuôi (cultured) Akoya, chuỗi graduated, khung bạc 925. Phong cách cổ điển, thanh lịch.',
    cutGrade: 'Akoya 7-7.5mm',
    origin: 'Cultured (nuôi)',
    badge: 'Classic',
    marketingTactics: [
      {
        tactic: 'Nhãn "Classic" / "Timeless"',
        decoded:
          'Cụm "classic" gợi liên tưởng đến hình ảnh quý tộc và thời trang cổ điển, tạo cảm giác bền vững theo thời gian. Ngọc trai cultured thực tế chiếm đa số thị trường, nhưng cụm từ này giúp khách hàng cảm thấy đang chọn một lựa chọn "vượt thời gian".',
      },
      {
        tactic: 'Không nhấn mạnh "cultured"',
        decoded:
          'Hầu hết ngọc trai trên thị trường đều là cultured (nuôi), nhưng thương hiệu thường không làm nổi bật chi tiết này. Hiểu rõ nguồn gốc giúp bạn đánh giá giá trị thực của sản phẩm.',
      },
      {
        tactic: 'Khung bạc 925 thay vì vàng',
        decoded:
          'Bạc 925 tiết kiệm chi phí hơn vàng, nhưng được định vị như "phong cách tối giản". Lưu ý rằng bạc cần được đánh bóng định kỳ để giữ độ sáng.',
      },
    ],
    whyNotToBuy: [
      {
        reason: 'Nếu bạn cần trang sức có khả năng giữ giá trị theo thời gian',
        detail:
          'Ngọc trai cultured chủ yếu mang giá trị thẩmỹ và cảm xúc. Nếu bạn cần tài sản có thể bán lại, vàng 18K/24K hoặc đá quý tự nhiên sẽ phù hợp hơn.',
        severity: 'low',
      },
      {
        reason: 'Nếu bạn thường xuyên tiếp xúc nước, hóa chất hoặc mồ hôi nhiều',
        detail:
          'Bạc 925 sẽ xỉn màu nhanh hơn vàng. Bạn cần đánh bóng định kỳ (3–6 tháng/lần) để giữ vẻ sáng. Nếu bạn muốn "đeo và quên", vàng là lựa chọn bền hơn.',
        severity: 'low',
      },
    ],
    honestVerdict:
      'Một món đồ thanh lịch với giá cả dễ tiếp cận, phù hợp cho người yêu phong cách cổ điển. Nếu bạn đánh giá cao vẻ đẹp và cảm xúc hơn giá trị bán lại, đây là lựa chọn đáng yêu.',
    whenToBuy:
      'Khi bạn thích ngọc trai cổ điển, đeo dịp lễ hoặc hàng ngày với phong cách nhẹ nhàng, và chấp nhận bảo dưỡng định kỳ.',
    alternatives: [
      {
        name: 'Dây ngọc trai Akoya khung vàng 14K',
        brand: 'Jemmia',
        url: 'https://jemmia.vn/',
        priceRange: '~10–14 triệu VND',
        whyBetter:
          'Khung vàng giữ giá trị, không cần xi màu. Cùng chất lượng ngọc trai, bền và sang hơn về lâu dài.',
      },
      {
        name: 'Dây ngọc trai Hanadama (top Akoya)',
        brand: 'Pearl Paradise',
        url: 'https://www.pearlparadise.com/',
        priceRange: '~15–20 triệu VND',
        whyBetter:
          'Chất lượng ngọc trai cao nhất, độ tròn và độ sáng vượt trội. Phù hợp nếu bạn muốn đầu tư vào một món đồ thực sự đặc biệt.',
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
          'Vàng 24K đúng là theo giá thế giới và phù hợp tích trữ. Tuy nhiên, phí chế tác nhẫn thường 5–10%, nghĩa là bạn mua đắt hơn giá vàng thỏi. Tích trữ thông minh hơn là mua thỏi vàng hoặc nhẫn trơn không viền phức tạp.',
      },
      {
        tactic: '"Vàng 24K nguyên chất = cao cấp nhất"',
        decoded:
          'Vàng 24K có độ tinh khiết cao nhất, phù hợp cho mục đích tích trữ. Nhưng với trang sức đeo hàng ngày, độ mềm của 24K có thể là điểm cần cân nhắc.',
      },
    ],
    whyNotToBuy: [
      {
        reason: 'Nếu bạn đang tìm nhẫn đeo hàng ngày thoải mái',
        detail:
          'Vàng 24K (99.99%) rất mềm, dễ xước, móp hoặc biến dạng khi va chạm thường xuyên. Nếu bạn đeo nhẫn khi làm việc, nấu ăn, hay vận động nhiều, vàng 18K hoặc 14K cứng hơn sẽ giữ dáng tốt hơn.',
        severity: 'medium',
      },
      {
        reason: 'Nếu bạn muốn thiết kế phức tạp, đính đá',
        detail:
          'Độ mềm của vàng 24K làm khó gia công các chi tiết nhỏ, đính đá chắc chắn. Phần lớn nhẫn 24K là thiết kế trơn hoặc họa tiết đơn giản.',
        severity: 'low',
      },
    ],
    honestVerdict:
      'Lựa chọn tuyệt vời nếu bạn muốn một món đồ tích trữ giá trị, mang ý nghĩa truyền thống. Đeo dịp lễ Tết, mang cảm giác "độc nhất" vì độ tinh khiết cao.',
    whenToBuy:
      'Mua vì ý nghĩa tích trữ/truyền thống, đeo thỉnh thoảng dịp đặc biệt. Nếu mục tiêu chính là đeo hàng ngày, cân nhắc 18K.',
    alternatives: [
      {
        name: 'Thỏi vàng 24K 1 chỉ',
        brand: 'DOJI / SJC',
        url: 'https://sjc.com.vn/',
        priceRange: '~5–6 triệu VND/chỉ',
        whyBetter:
          'Tích trữ thuần túy, không phí chế tác, dễ mua bán. Phù hợp nếu mục tiêu chính là đầu tư vàng.',
      },
      {
        name: 'Nhẫn vàng 18K đeo hàng ngày',
        brand: 'PNJ',
        url: 'https://www.pnj.com.vn/',
        priceRange: '~10–15 triệu VND',
        whyBetter:
          'Cứng hơn, giữ dáng tốt, thiết kế đa dạng. Phù hợp đeo hàng ngày thoải mái.',
      },
    ],
    targetBudget: 'low',
  },
  {
    name: 'Nhẫn Vàng 18K Đính Đá CZ',
    category: 'ring',
    material: 'Vàng 18K',
    price: 6500000,
    oldPrice: 8200000,
    image: '/products/gold-ring-cz.jpg',
    images: ['/products/gold-ring-cz.jpg'],
    description:
      'Nhẫn vàng 18K đính đá CZ (cubic zirconia) nhỏ, thiết kế thanh lịch tối giản. Phù hợp quà tặng, đeo hàng ngày.',
    badge: 'Everyday',
    marketingTactics: [
      {
        tactic: '"Đá CZ" thay vì "kim cương" — nhưng trình bày như trang sức cao cấp',
        decoded:
          'CZ là đá nhân tạo giá rất rẻ (~50–200k/viên). Sản phẩm này có giá hợp lý cho vàng 18K, nhưng nếu bạn đang tìm kiếm độ lấp lánh bền vững, CZ không phù hợp.',
      },
    ],
    whyNotToBuy: [
      {
        reason: 'Nếu bạn cần viên đá giữ độ bóng lâu dài',
        detail:
          'CZ sẽ xỉn và trầy sau 6–12 tháng sử dụng thường xuyên. Nếu bạn muốn "một lần mua, dùng lâu dài", moissanite hoặc kim cương thật sẽ giữ độ bóng tốt hơn.',
        severity: 'low',
      },
      {
        reason: 'Nếu bạn muốn bán lại sau vài năm',
        detail:
          'Giá trị CZ gần như bằng 0 khi bán lại. Toàn bộ giá trị sản phẩm nằm ở vàng 18K. Nếu bạn cần tính thanh khoản, nên ưu tiên vàng nguyên khối.',
        severity: 'low',
      },
    ],
    honestVerdict:
      'Một món nhẫn vàng 18K tinh tế với giá dễ tiếp cận. Phù hợp nếu bạn đánh giá cao chất liệu vàng và muốn đeo hàng ngày mà không cần lo về độ lấp lánh vĩnh cửu.',
    whenToBuy:
      'Khi bạn muốn nhẫn vàng thanh lịch đeo hàng ngày, ngân sách 5–7tr, và coi đây là "nhẫn vàng" chứ không cần viên đá lấp lánh bền.',
    alternatives: [
      {
        name: 'Nhẫn vàng 18K không đá',
        brand: 'PNJ',
        url: 'https://www.pnj.com.vn/',
        priceRange: '~4–6 triệu VND',
        whyBetter:
          'Cùng ngân sách, vàng nguyên khối giữ giá trị tốt hơn, không rủi ro đá xỉn.',
      },
      {
        name: 'Nhẫn moissanite 0.5ct',
        brand: 'Charles & Colvard',
        url: 'https://www.charlesandcolvard.com/',
        priceRange: '~3–5 triệu VND',
        whyBetter:
          'Moissanite lấp lánh hơn kim cương, không bao giờ xỉn, giá rẻ hơn nhiều. Phù hợp nếu bạn thích độ bóng.',
      },
    ],
    targetBudget: 'low',
  },
  {
    name: 'Dây Chuyền Vàng 24K Trơn',
    category: 'necklace',
    material: 'Vàng 24K',
    price: 28000000,
    oldPrice: 30000000,
    image: '/products/gold-necklace-24k.jpg',
    images: ['/products/gold-necklace-24k.jpg'],
    description:
      'Dây chuyền vàng 24K (999.9) trơn, chuỗi xíp cổ điển. Phù hợp tích trữ và đeo dịp lễ.',
    badge: 'Investment',
    marketingTactics: [
      {
        tactic: '"Vàng 24K nguyên chất = cao cấp nhất"',
        decoded:
          'Vàng 24K đúng là độ tinh khiết cao nhất, phù hợp tích trữ. Nhưng với dây chuyền đeo hàng ngày, độ mềm của 24K cần cân nhắc kỹ.',
      },
    ],
    whyNotToBuy: [
      {
        reason: 'Nếu bạn cần dây chuyền đeo thoải mái 24/7',
        detail:
          'Dây xíp vàng 24K mảnh, dễ vướng và đứt khi tiếp xúc tay áo, tóc hoặc vật cứng. Nếu nhu cầu là đeo thoải mái 24/7, dây 18K cứng hơn sẽ an toàn hơn.',
        severity: 'medium',
      },
      {
        reason: 'Nếu bạn muốn tối ưu chi phí tích trữ',
        detail:
          'Phí chế tác dây chuyền 24K chiếm 10–15% giá trị. Nếu mục tiêu là tích trữ thuần túy, thỏi vàng không phí chế tác sẽ hiệu quả hơn.',
        severity: 'low',
      },
    ],
    honestVerdict:
      'Món đồ sang trọng và có ý nghĩa tích trữ. Phù hợp đeo dịp lễ Tết, mang cảm giác "trân trọng". Nếu bạn đeo hàng ngày thường xuyên, cân nhắc dây 18K.',
    whenToBuy:
      'Mua vì ý nghĩa truyền thống/tích trữ, đeo dịp đặc biệt, không đeo hàng ngày thường xuyên.',
    alternatives: [
      {
        name: 'Thỏi vàng 24K 5 chỉ',
        brand: 'SJC / DOJI',
        url: 'https://sjc.com.vn/',
        priceRange: '~25–30 triệu VND',
        whyBetter:
          'Tích trữ thuần, không phí chế tác, dễ mua bán. Phù hợp nếu mục tiêu chính là đầu tư.',
      },
      {
        name: 'Dây chuyền vàng 18K',
        brand: 'PNJ',
        url: 'https://www.pnj.com.vn/',
        priceRange: '~15–22 triệu VND',
        whyBetter:
          'Cứng hơn, dây không đứt, đeo hàng ngày thoải mái. Thiết kế đa dạng.',
      },
    ],
    targetBudget: 'mid',
  },
  {
    name: 'Hoa Tai Ngọc Trai Akoya',
    category: 'earring',
    material: 'Vàng 14K',
    price: 9500000,
    oldPrice: 12000000,
    image: '/products/pearl-earrings.jpg',
    images: ['/products/pearl-earrings.jpg'],
    description:
      'Hoa tai stud ngọc trai Akoya cultured 7mm, khung vàng 14K. Cổ điển, thanh lịch, phù hợp mọi lứa tuổi.',
    cutGrade: 'Akoya 7mm',
    origin: 'Cultured (nuôi)',
    badge: 'Classic',
    marketingTactics: [
      {
        tactic: 'Không nhấn mạnh "cultured"',
        decoded:
          'Ngọc trai cultured chiếm 99% thị trường. Thương hiệu thường dùng cụm từ chung chung để khách hàng liên tưởng đến sự cao cấp, thay vì làm rõ nguồn gốc nuôi cấy.',
      },
      {
        tactic: 'Khung vàng 14K + cultured = 9.5tr',
        decoded:
          'Giá thành vật liệu thực tế thấp hơn nhiều so với giá bán. Bạn đang trả cho thiết kế, thương hiệu và trải nghiệm mua sắm.',
      },
    ],
    whyNotToBuy: [
      {
        reason: 'Nếu bạn đang tìm hoa tai có khả năng giữ giá trị',
        detail:
          'Ngọc trai Akoya cultured chủ yếu mang giá trị thẩmỹ. Nếu bạn cần tài sản có thể bán lại, vàng nguyên khối hoặc đá quý tự nhiên sẽ phù hợp hơn.',
        severity: 'low',
      },
      {
        reason: 'Nếu bạn thường xuyên tiếp xúc nước, hóa chất',
        detail:
          'Vàng 14K chịu tốt hơn bạc, nhưng ngọc trai vẫn có thể bị ảnh hưởng bởi hóa chất mạnh. Lau nhẹ sau khi đeo là đủ để giữ vẻ đẹp lâu dài.',
        severity: 'low',
      },
    ],
    honestVerdict:
      'Một món đồ cổ điển, dễ phối đồ và phù hợp mọi độ tuổi. Giá dễ tiếp cận cho một đôi hoa tai ngọc trai thương hiệu.',
    whenToBuy:
      'Khi bạn thích phong cách cổ điển, đeo thường ngày hoặc dịp, và coi trọng vẻ đẹp tinh tế hơn giá trị bán lại.',
    alternatives: [
      {
        name: 'Hoa tai ngọc trai Akoya khung bạc',
        brand: 'Jemmia',
        url: 'https://jemmia.vn/',
        priceRange: '~3–5 triệu VND',
        whyBetter:
          'Cùng chất lượng ngọc trai, giá rẻ hơn 50%. Phù hợp nếu bạn muốn ngọc trai với ngân sách tiết kiệm.',
      },
      {
        name: 'Hoa tai ngọc trai Tahitian (đen)',
        brand: 'Pearl Paradise',
        url: 'https://www.pearlparadise.com/',
        priceRange: '~15–25 triệu VND',
        whyBetter:
          'Ngọc trai Tahitian hiếm và độc đáo hơn. Nếu bạn muốn một món đồ thực sự khác biệt.',
      },
    ],
    targetBudget: 'low',
  },
  {
    name: 'Lắc Tay Vàng 18K',
    category: 'bracelet',
    material: 'Vàng 18K',
    price: 22000000,
    oldPrice: 25000000,
    image: '/products/gold-bracelet-18k.jpg',
    images: ['/products/gold-bracelet-18k.jpg'],
    description:
      'Lắc tay vàng 18K chuỗi xíp mảnh, thiết kế tối giản hiện đại. Đeo hàng ngày, giữ giá trị vàng.',
    badge: 'Everyday',
    marketingTactics: [
      {
        tactic: '"Everyday Gold" / "Tối giản hiện đại"',
        decoded:
          'Thuật ngữ "everyday" định vị vàng 18K như một phần của phong cách sống, thay vì chỉ là "tài sản". Điều này hợp lệ nếu bạn đúng là đeo hàng ngày, nhưng cần lưu ý phí chế tác lắc thường cao hơn nhẫn.',
      },
    ],
    whyNotToBuy: [
      {
        reason: 'Nếu bạn thường xuyên nấu ăn, thể thao hoặc làm việc tay',
        detail:
          'Chuỗi xíp mảnh dễ vướng tay áo, cửa, hay vật dụng xung quanh. Nếu bạn thường xuyên nấu ăn, thể thao, hoặc làm việc tay, lắc dày hơn hoặc thiết kế đơn khối sẽ an toàn hơn.',
        severity: 'low',
      },
      {
        reason: 'Nếu bạn ưu tiên tích trữ giá trị tối đa',
        detail:
          'Phí chế tác lắc tay chiếm 15–20% giá vàng — cao hơn nhẫn tròn. Nếu mục tiêu là tích trữ, nhẫn tròn hoặc thỏi vàng hiệu quả hơn.',
        severity: 'low',
      },
    ],
    honestVerdict:
      'Lựa chọn đẹp cho phong cách tối giản hiện đại. Vàng 18K đủ cứng để đeo hàng ngày, giữ giá trị kim loại ổn định.',
    whenToBuy:
      'Khi bạn thích phong cách nhẹ nhàng, đeo hàng ngày, và coi đây là trang sức chứ không phải kênh đầu tư.',
    alternatives: [
      {
        name: 'Nhẫn vàng 18K tròn',
        brand: 'DOJI',
        url: 'https://doji.vn/',
        priceRange: '~18–25 triệu VND',
        whyBetter:
          'Phí chế tác thấp hơn, giữ giá trị tốt hơn, đeo và tích trữ cùng lúc.',
      },
      {
        name: 'Lắc tay vàng 14K',
        brand: 'PNJ',
        url: 'https://www.pnj.com.vn/',
        priceRange: '~12–16 triệu VND',
        whyBetter:
          'Cứng hơn 18K, ít xước, giá dễ tiếp cận hơn. Phù hợp đeo hàng ngày thoải mái.',
      },
    ],
    targetBudget: 'mid',
  },
  {
    name: 'Nhẫn Bạch Kim Lab-Grown 0.5ct',
    category: 'ring',
    material: 'Bạch Kim (Platinum)',
    price: 38000000,
    oldPrice: 45000000,
    image: '/products/platinum-lab-ring.jpg',
    images: ['/products/platinum-lab-ring.jpg'],
    description:
      'Nhẫn solitaire 0.5 carat kim cương lab-grown, giác cắt Excellent, màu G, độ tinh khiết VS2, vỏ bạch kim. Carat vừa phải, thông số cao.',
    carat: 0.5,
    cutGrade: 'Excellent',
    colorGrade: 'G',
    clarityGrade: 'VS2',
    origin: 'Lab-grown',
    badge: 'Eco-Friendly',
    marketingTactics: [
      {
        tactic: 'Nhãn "Eco-Friendly"',
        decoded:
          'Lab-grown được định vị là lựa chọn bền vững. Thực tế quá trình nuôi cấy tốn năng lượng, nhưng lab-grown vẫn tiết kiệm được phần lớn tác động môi trường so với khai thác tự nhiên.',
      },
      {
        tactic: 'Bạch kim = "cao cấp"',
        decoded:
          'Bạch kim là kim loại bền nhất trong trang sức, không xỉn màu theo thời gian. Trải nghiệm "nặng tay" khi đeo là đặc tính thực, phù hợp người thích cảm giác đầm tay.',
      },
    ],
    whyNotToBuy: [
      {
        reason: 'Nếu bạn đang so sánh để tìm viên đá lớn nhất với ngân sách',
        detail:
          'Với 38tr, lab-grown có thể cho viên 0.8–1ct cùng thông số. 0.5ct là lựa chọn cân bằng giữa carat và chất liệu vỏ, nhưng nếu mục tiêu là "lớn nhất", bạn có thể xem xét lựa chọn khác.',
        severity: 'low',
      },
      {
        reason: 'Nếu bạn thích nhẫn nhẹ tênh',
        detail:
          'Bạch kim nặng hơn vàng trắng đáng kể. Nếu bạn chưa từng đeo bạch kim, có thể cảm thấy nặng hơn so với vàng 18K thông thường.',
        severity: 'low',
      },
    ],
    honestVerdict:
      'Sản phẩm thông minh nếu bạn ưu tiên chất liệu vỏ bền và thông số đá cao, với ngân sách vừa phải. Phù hợp người thích sự tinh tế, bền bỉ.',
    whenToBuy:
      'Khi bạn muốn nhẫn bạch kim bền mãi, thông số đá cao, và coi lab-grown là lựa chọn hợp lý về mặt hiệu quả.',
    alternatives: [
      {
        name: 'Nhẫn lab-grown 1ct G/VS2',
        brand: 'Lightbox',
        url: 'https://lightbox.jewelry/',
        priceRange: '~35–45 triệu VND',
        whyBetter:
          'Cùng ngân sách, viên đá gấp đôi carat, cùng thông số. Phù hợp nếu mục tiêu chính là kích thước ấn tượng.',
      },
      {
        name: 'Nhẫn moissanite 1ct',
        brand: 'Charles & Colvard',
        url: 'https://www.charlesandcolvard.com/',
        priceRange: '~5–8 triệu VND',
        whyBetter:
          'Độ lấp lánh cao hơn kim cương, to hơn, giá chỉ 1/5. Phù hợp nếu bạn chỉ cần vẻ ngoài đẹp và nổi bật.',
      },
    ],
    targetBudget: 'high',
  },
  {
    name: 'Dây Chuyền Mặt Charm Vàng Hồng',
    category: 'necklace',
    material: 'Vàng Hồng 14K',
    price: 12500000,
    oldPrice: 15000000,
    image: '/products/charm-necklace.jpg',
    images: ['/products/charm-necklace.jpg'],
    description:
      'Dây chuyền vàng hồng 14K mặt charm hình trái tim nhỏ, phong cách nữ tính. Phù hợp đeo hàng ngày hoặc quà tặng.',
    badge: 'Trending',
    marketingTactics: [
      {
        tactic: 'Vàng hồng = "Trending" / "Feminine"',
        decoded:
          'Xu hướng vàng hồng được dùng để tạo cảm giác hiện đại, nữ tính. Đây là lựa chọn phong cách — nếu bạn thích tông màu ấm, vàng hồng rất hợp. Nếu không, vàng trắng hoặc vàng vàng truyền thống vẫn là lựa chọn an toàn.',
      },
      {
        tactic: 'Charm nhỏ = "cảm xúc"',
        decoded:
          'Charm trái tim nhỏ mang ý nghĩa cảm xúc rõ ràng. Giá chế tác charm thấp nhưng được định giá theo cả câu chuyện và phong cách.',
      },
    ],
    whyNotToBuy: [
      {
        reason: 'Nếu bạn thường xuyên tiếp xúc hóa chất, nước hoa, mồ hôi nhiều',
        detail:
          'Lớp màu hồng của vàng hồng 14K có thể phai nhẹ theo thời gian. Xi lại màu định kỳ (~200–500k/lần) sẽ giữ vẻ mới.',
        severity: 'low',
      },
      {
        reason: 'Nếu bạn thích phong cách trung tính, dễ phối đồ',
        detail:
          'Vàng hồng có tông màu ấm đặc trưng. Nếu tủ đồ của bạn chủ yếu là bạc, đen, hoặc vàng trắng, vàng hồng có thể không phải lựa chọn dễ phối nhất.',
        severity: 'low',
      },
    ],
    honestVerdict:
      'Món đồ nữ tính, hợp trend, phù hợp quà tặng hoặc tự thưởng. Vàng hồng 14K vẫn đủ cứng để đeo hàng ngày.',
    whenToBuy:
      'Khi bạn thích phong cách vàng hồng, đeo hàng ngày, và chấp nhận xi màu định kỳ để giữ vẻ mới.',
    alternatives: [
      {
        name: 'Dây chuyền vàng 18K mặt đơn giản',
        brand: 'PNJ',
        url: 'https://www.pnj.com.vn/',
        priceRange: '~10–14 triệu VND',
        whyBetter:
          'Vàng 18K giữ màu tốt hơn, không cần xi, giá trị vàng cao hơn. Phù hợp đeo lâu dài.',
      },
      {
        name: 'Dây chuyền bạc 925 charm',
        brand: 'Pandora',
        url: 'https://www.pandora.net/',
        priceRange: '~2–4 triệu VND',
        whyBetter:
          'Phong cách charm tương tự, giá rẻ hơn nhiều. Phù hợp nếu bạn muốn "vibe" charm mà không đầu tư nhiều.',
      },
    ],
    targetBudget: 'mid',
  },
  {
    name: 'Set Trang Sức Kim Cương (Nhẫn + Dây)',
    category: 'diamond',
    material: 'Vàng Trắng 18K',
    price: 75000000,
    oldPrice: 92000000,
    image: '/products/diamond-set.jpg',
    images: ['/products/diamond-set.jpg'],
    description:
      'Set trang sức gồm nhẫn solitaire 0.3ct + dây chuyền mặt 0.2ct kim cương tự nhiên, vỏ vàng trắng 18K. Tổng 0.5ct, thông số trung bình.',
    carat: 0.5,
    cutGrade: 'Very Good',
    colorGrade: 'H',
    clarityGrade: 'SI1',
    origin: 'Tự nhiên',
    badge: 'Gift Set',
    marketingTactics: [
      {
        tactic: '"Set trang sức" = "tiết kiệm" so với mua lẻ',
        decoded:
          'Set được định vị như ưu đãi, nhưng thực tế thông số mỗi viên thường thấp hơn và tổng markup có thể không rẻ hơn mua lẻ.',
      },
      {
        tactic: 'Tổng 0.5ct spread trên 2 viên',
        decoded:
          'Tổng carat nghe ấn tượng, nhưng mỗi viên riêng lẻ khá nhỏ. Phong cách "đôi" có ý nghĩa cảm xúc riêng — hãy xem xét liệu bạn có cần cả hai món cùng lúc không.',
      },
    ],
    whyNotToBuy: [
      {
        reason: 'Nếu bạn thường xuyên đeo chỉ một trong hai món',
        detail:
          'Set bao gồm cả nhẫn và dây. Nếu bạn chỉ thường xuyên đeo một trong hai, có lẽ nên mua lẻ sản phẩm bạn thực sự dùng nhiều, với viên đá lớn hơn.',
        severity: 'medium',
      },
      {
        reason: 'Nếu bạn ưu tiên viên đá lớn, ấn tượng',
        detail:
          'Mỗi viên trong set khá nhỏ (0.3ct + 0.2ct). Cùng ngân sách 75tr, bạn có thể có một viên 0.5–0.7ct đẹp hơn rõ rệt.',
        severity: 'medium',
      },
    ],
    honestVerdict:
      'Set phù hợp nếu bạn muốn món quà "đôi" với ý nghĩa đặc biệt. Nếu chỉ cần một món trang sức, mua lẻ với viên đá lớn hơn sẽ đáng tiền hơn.',
    whenToBuy:
      'Khi bạn cần quà tặng set (nhẫn + dây), ngân sách thoải mái, và đánh giá cao ý nghĩa "đôi" hơn thông số từng viên.',
    alternatives: [
      {
        name: 'Nhẫn 0.5ct G/VS2 (tự nhiên)',
        brand: 'PNJ / DOJI',
        url: 'https://www.pnj.com.vn/',
        priceRange: '~60–75 triệu VND',
        whyBetter:
          '1 viên 0.5ct đẹp hơn 2 viên nhỏ, cùng ngân sách. Đáng tiền hơn về độ ấn tượng.',
      },
      {
        name: 'Set lab-grown 1ct tổng',
        brand: 'Lightbox',
        url: 'https://lightbox.jewelry/',
        priceRange: '~50–65 triệu VND',
        whyBetter:
          'Tổng carat gấp đôi, thông số tốt hơn, giá rẻ hơn. Nếu bạn thích set, đây là lựa chọn hiệu quả hơn.',
      },
    ],
    targetBudget: 'high',
  },
  {
    name: 'Nhẫn Vợ Chồng Vàng 14K',
    category: 'ring',
    material: 'Vàng 14K',
    price: 8500000,
    oldPrice: 9800000,
    image: '/products/couple-ring.jpg',
    images: ['/products/couple-ring.jpg'],
    description:
      'Đôi nhẫn vợ chồng vàng 14K (1 vàng + 1 vàng trắng), thiết kế đơn giản. Bán theo đôi, giá cho 2 chiếc.',
    badge: 'Couple',
    marketingTactics: [
      {
        tactic: '"Nhẫn vợ chồng" = cảm xúc + "trọn đời"',
        decoded:
          'Gắn nhẫn cưới với tình yêu vĩnh cửu là chiến lược cảm xúc hiệu quả. Sản phẩm này có ý nghĩa biểu tượng mạnh — điều quan trọng là bạn cảm thấy nó phù hợp với câu chuyện của mình.',
      },
      {
        tactic: '"Vàng 14K bền hơn 18K"',
        decoded:
          '14K cứng hơn 18K — đúng về mặt vật lý — nhưng chủ yếu được chọn để giảm giá thành. Vàng 14K có 58.5% vàng, thấp hơn 18K.',
      },
    ],
    whyNotToBuy: [
      {
        reason: 'Nếu bạn ưu tiên tối đa giá trị vàng trong đôi nhẫn',
        detail:
          '14K chỉ chứa 58.5% vàng. Nếu bạn muốn tối đa giá trị vật liệu, đôi 18K sẽ có nhiều vàng hơn — mặc dù giá cũng cao hơn.',
        severity: 'low',
      },
      {
        reason: 'Nếu bạn muốn thiết kế phức tạp hơn',
        detail:
          'Đôi nhẫn này có thiết kế đơn giản. Nếu bạn muốn đính đá, khắc chữ, hoặc kiểu dáng cầu hôn cầu kỳ hơn, có lẽ nên xem xét các lựa chọn khác.',
        severity: 'low',
      },
    ],
    honestVerdict:
      'Đôi nhẫn hợp lý cho cặp đôi muốn bắt đầu với ngân sách vừa phải. 14K cứng đủ cho đeo hàng ngày, thiết kế đơn giản dễ phối.',
    whenToBuy:
      'Khi bạn cần nhẫn cưới đeo hàng ngày, ngân sách 8–10tr/đôi, và ưu tiên sự bền mặc và ý nghĩa hơn kiểu dáng cầu kỳ.',
    alternatives: [
      {
        name: 'Đôi nhẫn 18K xưởng',
        brand: 'PNJ',
        url: 'https://www.pnj.com.vn/',
        priceRange: '~10–14 triệu VND/đôi',
        whyBetter:
          '18K giữ giá trị vàng tốt hơn, cứng đủ cho đeo hàng ngày.',
      },
      {
        name: 'Đôi nhẫn bạch kim',
        brand: 'PNJ',
        url: 'https://www.pnj.com.vn/',
        priceRange: '~18–25 triệu VND/đôi',
        whyBetter:
          'Bạch kim không xỉn, giữ dáng tốt, hypoallergenic. Phù hợp nếu ngân sách cho phép và bạn muốn "vĩnh cửu".',
      },
    ],
    targetBudget: 'low',
  },
]

async function main() {
  console.log('Seeding products...')
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
