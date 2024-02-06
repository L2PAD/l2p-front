import Image from 'next/image'
import UsdcAnim from '../../../lotties-animations/USDC staking.json'
import Lottie from 'lottie-react'
import NonameImg from '../../../img/noname-icon.png'
import upperCaseFirstLetter from '../../../../utils/upperCase'
import styles from './list.module.scss'

const UsdcList = ({title,subTitle,items}) => {

  return (
      <div className={styles.body}>
          <div className={styles.head}>
            <div className={styles.title}>
              {title}
            </div>
            <div className={styles.subTitle}>
              {subTitle}
            </div>
          </div>
          <div className={styles.items}>
              {
                items.map((item,index) => {
                  return (
                    <div
                    className={styles.item}
                    key={index}
                    >
                      <div className={styles.itemWrapper}>
                        <Image
                        src={NonameImg}
                        alt={'Noname'}
                        />
                        <div className={styles.vault}>
                            {item.vault}
                        </div>
                      </div>
                        {
                          item.duration
                          ?
                          <div className={styles.duration}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="21" viewBox="0 0 20 21" fill="none">
                              <mask id="mask0_173_247" maskUnits="userSpaceOnUse" x="0" y="0" width="20" height="21">
                              <path d="M0 0H19.159V20.825H0V0Z" fill="white"/>
                              </mask>
                              <g mask="url(#mask0_173_247)">
                              <path d="M19.1405 11.5926C19.1372 11.6501 19.1372 11.707 19.1313 11.764L19.1155 11.9353L19.0998 12.1062L19.0917 12.1913C19.089 12.22 19.0841 12.2482 19.0803 12.2764L19.0315 12.6159C19.025 12.6723 19.0119 12.7282 19.0011 12.7846L18.9686 12.9527L18.9355 13.1208L18.8948 13.2873L18.8536 13.4533C18.839 13.5086 18.8276 13.5644 18.8097 13.6187L18.711 13.9462C18.6958 14.0016 18.6763 14.0547 18.6567 14.1084L18.5992 14.2695L18.5423 14.4305C18.5212 14.4837 18.4989 14.5357 18.4772 14.5889L18.4121 14.7467C18.3899 14.7988 18.3704 14.8525 18.3449 14.9034L18.199 15.212C17.9946 15.6182 17.7662 16.0125 17.5081 16.3856C17.2467 16.7571 16.962 17.1112 16.6545 17.4431C16.3421 17.7717 16.0091 18.0787 15.6572 18.3618C15.3025 18.6416 14.9278 18.8949 14.5395 19.1232L14.2433 19.2864C14.1951 19.3152 14.1436 19.3385 14.0931 19.3635L13.9418 19.4383L13.7905 19.5126L13.6354 19.5793L13.4808 19.6465C13.4293 19.6688 13.3778 19.6916 13.3247 19.7105L13.009 19.8288C12.957 19.8499 12.9027 19.8646 12.8496 19.8824L12.6891 19.934C12.6359 19.9508 12.5822 19.9687 12.5285 19.9844L12.3658 20.0278L12.2037 20.0712C12.1495 20.0858 12.0952 20.101 12.0405 20.1113L11.7113 20.1813C11.657 20.1943 11.6012 20.2013 11.5459 20.2111L11.3805 20.2377L11.2145 20.2648L11.0475 20.2832C10.9363 20.2946 10.8251 20.3098 10.7139 20.3179L10.3788 20.338L10.2953 20.3429C10.2671 20.344 10.2394 20.3434 10.2112 20.344L10.0436 20.3456C9.8202 20.3526 9.59677 20.3369 9.37387 20.3288C9.2627 20.3206 9.15152 20.3087 9.04035 20.2989C8.98503 20.2935 8.92917 20.2897 8.87386 20.2827L8.54304 20.235C8.48827 20.2268 8.43295 20.2203 8.37818 20.2084L8.05062 20.1438C7.99584 20.1346 7.94161 20.12 7.88792 20.1064L7.72577 20.0663L7.56416 20.0262L7.40418 19.9784L7.24473 19.9302C7.19159 19.9134 7.1379 19.8998 7.08583 19.8803L6.77238 19.768C6.71923 19.7507 6.66825 19.729 6.61727 19.7073L6.46325 19.6438L6.30978 19.5804L6.15901 19.5093L6.00879 19.4383C5.9589 19.4144 5.90792 19.3927 5.85965 19.3651L5.56626 19.2089C5.18067 18.9903 4.80918 18.749 4.45776 18.48C4.10905 18.2083 3.77932 17.9138 3.4702 17.5993C3.16596 17.2799 2.88341 16.9409 2.62473 16.5852C2.3693 16.2272 2.14206 15.8498 1.9387 15.4615L1.7939 15.1665C1.76841 15.1176 1.74834 15.0667 1.72665 15.0162L1.66103 14.8655L1.59649 14.7147L1.53901 14.5607L1.48098 14.4072C1.462 14.3562 1.44193 14.3053 1.42675 14.2526L1.32642 13.9403C1.30852 13.8888 1.29713 13.8351 1.28249 13.7825L1.24019 13.6241L1.19843 13.4657L1.16481 13.3052L1.13064 13.1452C1.11925 13.0921 1.10678 13.0389 1.09919 12.9847L1.04712 12.6615C1.03736 12.6078 1.03248 12.5536 1.02652 12.4993L1.00862 12.3366L0.990724 12.1745C0.985843 12.1203 0.983674 12.0655 0.98042 12.0113C0.974454 11.9022 0.966319 11.7938 0.961981 11.6848C0.961438 11.4668 0.953304 11.2493 0.967404 11.0318L0.974454 10.8686C0.975539 10.8415 0.976081 10.8144 0.97825 10.7872L0.985843 10.7059L1.01567 10.3816C1.0276 10.2737 1.04604 10.1663 1.06068 10.0589L1.084 9.89784L1.11546 9.7384L1.14691 9.57841C1.15776 9.52581 1.16589 9.47212 1.18053 9.41951L1.25917 9.10443C1.27056 9.05128 1.28737 8.99976 1.3031 8.94824L1.35028 8.7926L1.39692 8.63749C1.41427 8.58597 1.43326 8.53554 1.45115 8.48456L1.50593 8.33163C1.52436 8.28119 1.54009 8.22913 1.56233 8.17978L1.68652 7.88042C1.70604 7.82998 1.7299 7.78172 1.75268 7.73291L1.8221 7.58648L1.89097 7.44006L1.96744 7.29688L2.04336 7.15425C2.06885 7.10707 2.09326 7.05881 2.122 7.01325L2.28795 6.73559C2.51898 6.37169 2.77224 6.02189 3.04936 5.69325C3.33083 5.36732 3.6329 5.06091 3.95341 4.77619C4.27771 4.49473 4.62154 4.23767 4.97947 4.00285C5.33903 3.77128 5.71702 3.56953 6.1037 3.39057L6.39763 3.26367C6.4459 3.24143 6.49688 3.22516 6.54623 3.20564L6.69591 3.14978C6.7458 3.13134 6.7957 3.11182 6.84559 3.09392L6.99798 3.04566L7.14983 2.99739C7.20081 2.98058 7.25124 2.96431 7.30276 2.95183L7.61134 2.86994C7.66232 2.85476 7.71492 2.84608 7.76644 2.83469L7.92263 2.80161L8.07828 2.76853L8.23555 2.74304L8.39282 2.7181C8.44543 2.70996 8.49749 2.69966 8.55009 2.69532L8.86681 2.66061C8.89338 2.6579 8.91941 2.6541 8.94599 2.65193L9.02516 2.64759L9.34296 2.62916C9.39557 2.62536 9.44926 2.62753 9.50186 2.6259L9.8202 2.62373L9.85762 2.62319C9.86088 2.62319 9.86467 2.62319 9.86847 2.62265L9.41292 3.86564L12.3176 1.93282L9.41292 0L9.85545 1.20666C9.84352 1.20666 9.83213 1.20611 9.8202 1.20666L9.45143 1.2213C9.3896 1.22455 9.32832 1.22455 9.26704 1.23052L8.89935 1.26414L8.80715 1.27282C8.77678 1.27553 8.74641 1.28095 8.71604 1.28475L8.35052 1.33681C8.28924 1.34441 8.22958 1.35796 8.16884 1.36935L7.80658 1.43985L7.62761 1.48324L7.44865 1.52771C7.38953 1.54289 7.32934 1.55537 7.27077 1.57435L6.91772 1.6801C6.8586 1.69691 6.80058 1.71752 6.74309 1.73867L6.56955 1.79995L6.39601 1.86178C6.33906 1.88401 6.28266 1.90787 6.22572 1.93119L6.05543 2.00115C5.99903 2.02501 5.94154 2.04616 5.88677 2.07382L5.55433 2.23001C5.11614 2.44965 4.6915 2.69478 4.28964 2.97299C3.88941 3.25336 3.50816 3.55923 3.15023 3.89059C2.7961 4.22574 2.46529 4.58367 2.15996 4.96221C1.85789 5.344 1.5851 5.74748 1.33889 6.16561L1.1621 6.48395C1.13173 6.53601 1.10624 6.59133 1.07912 6.64556L0.918595 6.97204L0.845925 7.13853L0.773796 7.30556C0.749392 7.36088 0.724988 7.41619 0.70438 7.47314L0.576393 7.81317C0.554158 7.86957 0.537888 7.92814 0.518365 7.98563L0.463048 8.15808C0.444609 8.21611 0.425628 8.27306 0.408274 8.33108L0.361092 8.50625L0.314453 8.68142C0.298726 8.73999 0.282456 8.79802 0.271068 8.85767L0.194601 9.21181C0.181043 9.27092 0.172908 9.33057 0.162604 9.39023L0.133861 9.56919L0.104576 9.74762L0.0839679 9.92767C0.0714946 10.0475 0.0557673 10.1668 0.046548 10.2872L0.0243129 10.6479L0.0188898 10.7379C0.0178052 10.7683 0.0183474 10.7981 0.0178051 10.8285L0.0156358 11.0085C0.00804347 11.2493 0.0243129 11.4895 0.03299 11.7298C0.0416671 11.8496 0.0541404 11.9695 0.0644445 12.0888C0.07041 12.149 0.0747486 12.2087 0.082341 12.2683L0.107288 12.4467L0.132777 12.6252C0.141454 12.6848 0.149046 12.7439 0.161519 12.803L0.230394 13.1566C0.240698 13.2157 0.256425 13.2738 0.270525 13.3318L0.313368 13.507L0.356754 13.6816L0.408274 13.8535L0.459794 14.026C0.478233 14.0829 0.492876 14.1415 0.514026 14.1973L0.634421 14.5363C0.653402 14.5927 0.676721 14.648 0.699499 14.7033L0.767831 14.8693L0.836705 15.0352L0.91263 15.1979L0.989097 15.3601C1.01459 15.4143 1.03845 15.4691 1.06773 15.5211L1.23585 15.8378C1.47122 16.2538 1.73099 16.6551 2.02059 17.0342C2.31289 17.4106 2.63015 17.7669 2.9691 18.0999C3.31293 18.429 3.67845 18.7338 4.06187 19.0131C4.448 19.2897 4.8542 19.5354 5.27341 19.7555L5.59175 19.9123C5.64435 19.9394 5.69967 19.9611 5.7539 19.9855L5.9166 20.056L6.07929 20.1259L6.41119 20.2507C6.46651 20.2718 6.52182 20.293 6.57823 20.3098L6.91555 20.4183C6.97141 20.4378 7.02889 20.4503 7.08583 20.4665L7.25667 20.5121L7.42804 20.5571L7.60104 20.5945L7.77404 20.6314C7.83152 20.6433 7.88901 20.6569 7.94758 20.6656L8.29629 20.722C8.35432 20.7328 8.41289 20.7382 8.47146 20.7447L8.64663 20.7643L8.82234 20.7838C8.88091 20.7892 8.93948 20.7914 8.99805 20.7952C9.11573 20.8017 9.23287 20.8104 9.35056 20.8152C9.58538 20.8163 9.8202 20.825 10.055 20.8104L10.2307 20.8028C10.26 20.8017 10.2893 20.8006 10.3186 20.799L10.4064 20.7908L10.7568 20.7588C10.8734 20.7464 10.9889 20.7268 11.105 20.7111L11.279 20.6856L11.624 20.6184C11.6814 20.607 11.7395 20.5978 11.7959 20.582L12.137 20.498C12.1939 20.485 12.2498 20.4676 12.3056 20.4508L12.4738 20.3998L12.6419 20.3494C12.6972 20.3309 12.752 20.3103 12.8073 20.2914L12.9722 20.2322C13.0269 20.2122 13.0828 20.1948 13.1365 20.1715L13.4602 20.0376C13.515 20.0164 13.5676 19.9909 13.6202 19.966L13.7786 19.8917L13.9369 19.8168L14.0915 19.7349L14.2455 19.6525C14.297 19.6248 14.3491 19.5988 14.3985 19.5679L14.6989 19.3889C15.0926 19.14 15.4706 18.8667 15.8258 18.5673C16.1783 18.2642 16.5102 17.9382 16.8183 17.5922C17.1225 17.2419 17.4013 16.871 17.6551 16.4843C17.9062 16.0954 18.1253 15.6876 18.3194 15.269L18.4566 14.9512C18.481 14.8991 18.4989 14.8443 18.5201 14.7906L18.5808 14.6285C18.6009 14.5742 18.6215 14.5211 18.641 14.4663L18.7462 14.1377C18.7641 14.0829 18.782 14.0281 18.7961 13.9723L18.885 13.6387C18.9008 13.5834 18.9105 13.5265 18.9236 13.4701L18.9593 13.3014L18.9951 13.1333L19.0505 12.7927C19.0591 12.7358 19.0705 12.6794 19.0754 12.6224L19.1134 12.2802C19.1161 12.2515 19.1204 12.2228 19.122 12.1946L19.1275 12.1083L19.1378 11.937L19.1481 11.765C19.1519 11.7076 19.1502 11.6506 19.1513 11.5931L19.1546 11.2493L19.1405 11.5926Z" fill="black"/>
                              </g>
                            </svg>
                            <div className={styles.durationInfo}>
                                <div className={styles.durationLabel}>
                                  Duration
                                </div>
                                <div className={styles.durationValue}>
                                  {item.duration}
                                </div>
                                <div className={styles.durationLabel}>
                                  Daily vested
                                </div>
                            </div>
                          </div>
                          :
                          <div className={styles.amount}>
                              <div className={styles.amountAnim}>
                                <Lottie animationData={UsdcAnim}/>
                              </div>
                              <div className={styles.amountInfo}>
                                <div className={styles.amountLabel}>
                                  AMOUNT
                                </div>
                                <div className={styles.amountValue}>
                                  {item.amount}
                                </div>
                              </div>
                          </div>
                        }
                        <div className={styles.apy}>
                            <div className={styles.apyIcon}>
                              <div className={styles.apyIconItem}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="5" height="5" viewBox="0 0 5 5" fill="none">
                                  <path d="M4.12575 2.22151L3.18356 2.21213L3.19293 1.26838C3.19554 0.997028 2.97835 0.774633 2.707 0.771507C2.43564 0.768903 2.21377 0.986612 2.21064 1.25849L2.20127 2.20172L1.25856 2.19234C1.25648 2.19234 1.25387 2.19234 1.25179 2.19234C0.983562 2.19338 0.765333 2.40953 0.762729 2.6788C0.759603 2.95068 0.977312 3.17307 1.24867 3.17568L2.19085 3.18557L2.18148 4.1288C2.17835 4.40068 2.39606 4.62307 2.66741 4.62568C2.67002 4.62568 2.6721 4.62568 2.67419 4.62568C2.94241 4.62463 3.16064 4.40849 3.16377 4.13922L3.17314 3.19547L4.11585 3.20536C4.11793 3.20536 4.12002 3.20536 4.12262 3.20536C4.39085 3.20432 4.60908 2.98765 4.61168 2.71838C4.61481 2.44703 4.3971 2.22463 4.12575 2.22151Z" fill="#0D0F2B" fillOpacity="0.5"/>
                                </svg>
                              </div>
                              <div className={styles.apyIconItem}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="4" height="2" viewBox="0 0 4 2" fill="none">
                                <path d="M3.50911 1.18776C3.50651 1.18776 3.50443 1.18776 3.50182 1.18776L0.635157 1.18255C0.363803 1.18255 0.144011 0.961718 0.144532 0.690364C0.145053 0.421093 0.36172 0.202344 0.629949 0.199219C0.632032 0.199219 0.634115 0.199219 0.63672 0.199219L3.50391 0.204427C3.77526 0.204427 3.99453 0.42526 3.99401 0.696614C3.99349 0.965884 3.77682 1.18463 3.50911 1.18776Z" fill="#0D0F2B" fillOpacity="0.5"/>
                                </svg>
                              </div>
                              <div className={styles.apyIconItem}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="4" height="4" viewBox="0 0 4 4" fill="none">
                                <path d="M2.3819 2.30254L3.04909 1.63692C3.24128 1.44525 3.24232 1.13379 3.05065 0.941086C2.85898 0.748899 2.54805 0.748378 2.35586 0.940045L1.68815 1.60619L1.02305 0.93744C1.02148 0.935878 1.01992 0.934315 1.01836 0.932753C0.826693 0.745253 0.519402 0.746294 0.328777 0.936399C0.136589 1.12807 0.136068 1.43952 0.327214 1.63171L0.992839 2.30046L0.325131 2.96661C0.132943 3.15827 0.132423 3.46921 0.324089 3.66192C0.325652 3.66348 0.327214 3.66505 0.328777 3.66661C0.520443 3.85411 0.827735 3.85307 1.01836 3.66296L1.68607 2.99682L2.35117 3.66557C2.35273 3.66713 2.3543 3.66869 2.35638 3.67025C2.54805 3.85775 2.85534 3.85671 3.04596 3.66661C3.23815 3.47494 3.23815 3.16348 3.047 2.9713L2.3819 2.30254Z" fill="#0D0F2B" fillOpacity="0.5"/>
                                </svg>
                              </div>
                              <div className={styles.apyIconItem}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="5" height="5" viewBox="0 0 5 5" fill="none">
                                  <path d="M4.12575 2.22151L3.18356 2.21213L3.19293 1.26838C3.19554 0.997028 2.97835 0.774633 2.707 0.771507C2.43564 0.768903 2.21377 0.986612 2.21064 1.25849L2.20127 2.20172L1.25856 2.19234C1.25648 2.19234 1.25387 2.19234 1.25179 2.19234C0.983562 2.19338 0.765333 2.40953 0.762729 2.6788C0.759603 2.95068 0.977312 3.17307 1.24867 3.17568L2.19085 3.18557L2.18148 4.1288C2.17835 4.40068 2.39606 4.62307 2.66741 4.62568C2.67002 4.62568 2.6721 4.62568 2.67419 4.62568C2.94241 4.62463 3.16064 4.40849 3.16377 4.13922L3.17314 3.19547L4.11585 3.20536C4.11793 3.20536 4.12002 3.20536 4.12262 3.20536C4.39085 3.20432 4.60908 2.98765 4.61168 2.71838C4.61481 2.44703 4.3971 2.22463 4.12575 2.22151Z" fill="#0D0F2B" fillOpacity="0.5"/>
                                </svg>
                              </div>
                            </div>
                            <div className={styles.apyInfo}>
                              <div className={styles.apyLable}>
                                APY
                              </div>
                              <div className={styles.apyValue}>
                                {item.apy}
                              </div>
                            </div>
                        </div>
                        <button
                        className={styles.btn + ' ' + styles[item.status]}
                        >
                          {upperCaseFirstLetter(item.status)}
                        </button>
                    </div>
                  )
                })
              }
          </div>
      </div>
  )
}

export default UsdcList
